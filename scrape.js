
var request = require('/usr/local/lib/node_modules/request'),
	cheerio = require('/usr/local/lib/node_modules/cheerio'),
	fs      = require('fs');

var PPTPathPrefix = "http://www.ptt.cc",
	GossipPathLatest = "http://www.ptt.cc/bbs/Gossiping/index.html";

var id, title, time, bbs, ip, link;

var pushArr = [];

var pageNext, page_count=0, page_total=0;

// Run the scraper! 
pttTraversal("index", 4467);

// start_page: 起始頁數 ex. index, 4057.   end_page:結束頁 ex. 4000
function pttTraversal(start_page, end_page){

	var pageURL = (start_page == "index") ? GossipPathLatest : "http://www.ptt.cc/bbs/Gossiping/index"+start_page+".html";

	var j = request.jar()
	var cookie = request.cookie('over18=1');
	j.setCookie(cookie, pageURL);

	var pages = [];
	var this_page = start_page;

	request({url: pageURL, jar: j}, function(e, r, b){
		if(!e && r.statusCode == 200){
			var html = cheerio.load(b);
			pageNext = PPTPathPrefix + html('.pull-right').find('a').eq(1).attr('href');
			pageNext = pageNext.match(/\d{1,4}/g);
			page_buf = html('.r-ent');
			page_buf.each(function(i, ele){
				var buf = html(this).find('.title').find('a').attr('href');
				if(buf){
					var status = html(this).find('.nrec').find('span').text();
					pages.push({
						"status": status,
						"url": buf
					});
				}
			});
			page_total = pages.length;
			console.log("page_total: " + page_total + " at page: " + this_page);
			for(var i=0; i<page_total; i++){
				setTimeout( scrape, 1000*i, pages[i].url, pages[i].status);
			}
		}else{
			console.log("Page Request Error at " + pageURL);
			throw e;
		}
	});

	var si = setInterval(function(){
		if(page_count == page_total){
			clearInterval(si);
			if(this_page == end_page){
				fs.writeFile('gossip.json', JSON.stringify(pushArr, null, 2), 'utf8', function(err){
					if(err){
						console.log("Write Error");
						throw err;
					}
					console.log("Write File Successfully!");
					return;
				});
			}else{
				console.log("processing next page: " + pageNext);
				page_count = page_total =0;
				pttTraversal(pageNext, end_page);
			}
		}
	}, 500);	
}

// Scraping the content of a ppt page
function scrape(url, status){

	var pttGossipPath = "http://www.ptt.cc" + url;

	var j = request.jar()
	var cookie = request.cookie('over18=1');
	j.setCookie(cookie, pttGossipPath);

	request({url: pttGossipPath, jar: j}, function(error, response, body){
		if(!error && response.statusCode == 200){		

			var $ = cheerio.load(body);

			var buf = $('div.article-metaline');
			buf.each(function(i, ele){
				if(i == 0){
					id = $(this).find('.article-meta-value').text();
					var indie = id.search(" ");
					if(indie != -1)
						id = id.slice(0, indie);
				}else if(i == 1){
					title = $(this).find('.article-meta-value').text();
				}else{
					time = $(this).find('.article-meta-value').text();
				}
			});

			bbs = $('div.article-metaline-right').find('.article-meta-value').text();

          	// 處理 url 和 ip by RegExp 
			var buff = $('span.f2');
			var regExp_ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
			
			link = pttGossipPath;

			buff.each(function(i, ele){
				var text_ip = $(this).text();
				if(regExp_ip.test(text_ip)){
					var ip_buf = text_ip.match(regExp_ip);
					ip = ip_buf[0]; 
				}
			});

			var post = {
				"bbs": bbs,
				"title": title,
				"time": time,
				"url": link,
				"ip": ip,
				"res": status
			};

			var z=0, flag=false;

		  	pushArr.forEach(function(element, index, array){
		  		if(element.id == id){
		  			z = index;
		  			flag = true;
		  			return;
		  		}
		  	});

			/////////////////////////// 以下開始處理ＰＯ文 /////////////////////////////

		  	if(z || flag == true){
		  		pushArr[z].POST.push(post);
		  	}else{
		  		var arr = new Array(post);
		  		pushArr.push({
		  			"id": id,
		  			"ip": [],
		  			"POST": arr,
		  			"REPO": []
		  		});
		  	}

			/////////////////////////// 以下開始處理推文 ///////////////////////////////

			var push = $('.push');
			var pushBuf = []; // 用以緩存一篇文中所有推文的資訊 {"id": "myID", "res": []}

			// 將該篇文章中所有推文先集中保存在pushBuf[]中
			push.each(function(i, ele){

				var p = $(this).find('.push-tag').text(); // p: 推、噓、->
				var pid = $(this).find('.push-userid').text(); // 誰推的～
				var j = 0, flag = false;

				pushBuf.forEach(function(element, index, array){
					if(element.id == pid){
						j = index;
						flag = true;
						return;
					}
				});

				if(j || flag == true){ // pushBuf 中沒有緩存到當下的 element,則做一個推文的 object 存進pushBuf[]中
				 	
				 	if(p=="推 "){
				 		pushBuf[j].res[0] += 1;
				 	}else if(p=="噓 "){
				 		pushBuf[j].res[1] += 1;
				 	}else{
				 		pushBuf[j].res[2] += 1;
				 	}

				}else{
				 	var b = [];
					if(p=="推 "){
						b = [1, 0, 0];
					}else if(p=="噓 "){
						b = [0, 1, 0];
					}else{
						b = [0, 0, 1];	
					}
				 	pushBuf.push({
				 		"id": pid,
				 		"res": b
				 	});
				}  
			});  

			// 將保存于pushBuf[]中的object一一存回global的pushArr[]中
		  	pushBuf.forEach(function(element, index, array){
		  		var z=0, flag=false;

		  		pushArr.forEach(function(e, i, a){
		  			if(e.id == element.id){
		  				z = i;
		  				flag = true;
		  				return;
		  			}
		  		});

				var buf = {
							"bbs": bbs,
							"title": title,
							"time": time,
							"url": link,
							"res": element.res
						};	

				if(z || flag == true){ // 該 user id 不存在，則建立該 user object，並push進pushArr[]！	
		  			pushArr[z].REPO.push(buf);						  			
		  		}else{
					pushArr.push({
									"id": element.id,
									"ip": [],
									"POST": [],
									"REPO": [buf]
								});	
		  		}					

		  	});
			page_count++;
			console.log("page_count: ", page_count);
		}else{
			console.log("Requset Error at: " + pttGossipPath);
			console.log("Response StatusCode: " + response.statusCode);
			throw error;
		}
	});
}


