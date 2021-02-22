window.addEventListener("load", function(){
	Vue.filter("gettime", function(value, format){
		let time = new Date(value);
		let year = time.getFullYear();
		let month = time.getMonth() + 1 +"";
		let day = time.getDate() + "";
		let hour = time.getHours() + "";
		let minute = time.getMinutes() + "";
		let seconds = time.getSeconds() + "";
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
		
	})
	let vue = new Vue({
		el: "#app",
		data: {
			newstudent: {
				number: "",
				name: "",
				id:"",
				score:"",
				time: "",
				isdisabled: true, 
				show: true,
				checked: false
			},
			students: [
				{number: 1, name: "ym", score: 65, id: "21827103", time: Date.now(), isdisabled: true, show: true, checked: false},
				{number: 2, name: "ym", score: 65, id: "21827104", time: Date.now(), isdisabled: true, show: true, checked: false},
				{number: 3, name: "ym", score: 65, id: "21827105", time: Date.now(), isdisabled: true, show: true, checked: false}
			],
			allstudents: [],
			checkall: false
		},
		methods: {
			modify(e, index){
				//modify和save的切换
				if(e.target.innerText == "modify"){
					this.isDisabled = false;
					e.target.innerText ="save";
					this.students[index].isdisabled = false;
				}else {
					e.target.innerText = "modify"
					this.isDisabled = true;
					this.students[index].isdisabled = true;
					this.students[index].time;
					console.log(Date.now())
				}
			},
			remove(e, index){
				this.students[index].show = false;
				this.students[index].number = -1;
				for(item in this.students){
					if(item > index){
						this.students[item].number--;
					}
				}
			},
			add(e){
				if(this.newstudent.id =="" || this.newstudent.name =="" || this.newstudent.score ==""){
					alert("请输入要添加的学生姓名，学号以及成绩");
					return
				}
				//优化，这里每次都得重新找num
				let num = 0
				//浅拷贝？？赋值？？
				this.newstudent.time = Date.now();
				for(item in this.students){
					if(this.students[item].number >=0){
						//引用类型，值会变化
						num = this.students[item].number + 1
					}
				}
				if(num == 0){
					num++;
				};
				this.newstudent.number = num;
				this.newstudent.checked = this.checkall;
				this.students.push(this.newstudent);
				//直接给newstudent重新指定堆内存， 仅students中的student指向之前的内存
				this.newstudent = {
					number: "",
					name: "",
					id:"",
					score:"",
					time: "",
					isdisabled: true, 
					show: true
				}
			},
			//search之后的number没变
			search(e){
				if(this.newstudent.id =="" && this.newstudent.name =="" && this.newstudent.score ==""){
					alert("请输入要查询的学生姓名，学号或成绩");
					return
				}
				let result = [];
				if(this.newstudent.id != ""){
					//有id
					result = this.searchid(this.newstudent.id, this.students);
					if(this.newstudent.name != ""){
						//有id, name
						result = this.searchname(this.newstudent.name, result);
						if(this.newstudent.score != ""){
							//id, name, score全有
							result = this.searchscore(this.newstudent.score, result);
						}
					} 
				}else if(this.newstudent.name != ""){
					//id空，有name
					result = this.searchname(this.newstudent.name, this.students);
					if(this.newstudent.score != ""){
						//id空, 有name, score
						result = this.searchscore(this.newstudent.score, result);
					}
				}else {
					//仅成绩
					result = this.searchscore(this.newstudent.score, this.students);
				}
				
				//保存原来的数据
				this.allstudents = this.students;
				this.students = result;
				
				this.newstudent = {
					number: "",
					name: "",
					id:"",
					score:"",
					time: "",
					isdisabled: true, 
					show: true
				}
			},
			searchid(id, sd){
				let result = [];
				for(item in sd){
					if(id == sd[item].id){
						result.push(sd[item]);
					}
				}
				return result;
			},
			searchname(name, sd){
				let result = [];
				for(item in sd){
					if(name == sd[item].name){
						result.push(sd[item]);
					}
				}
				return result;
			},
			searchscore(score, sd){
				let result = [];
				for(item in sd){
					if(score == sd[item].score){
						result.push(sd[item]);
					}
				}
				return result;
			},
			turnBack(e){
				this.students = this.allstudents;
			},
			//选择数据
			checkbox(e){
				var that = this;
				var isallchecked = true;
				let timer = setTimeout(function(){
					for(item in that.students){
						if(that.students[item].checked != true){
							isallchecked = false;
							console.log(1);
							console.log(isallchecked)
							break
						}
					}
					that.checkall = isallchecked;
				}, 50)
				
			},
			checkAll(e){
				//checkbox的值在点击完之后才会变,使用异步
				let ischoose = !this.checkall;
				for(item in this.students){
					this.students[item].checked = ischoose;
				}
			}
			//选择数据，批量修改，删除
		}
	})
})

