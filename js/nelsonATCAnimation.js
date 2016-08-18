(function(){
	var nelsonATCAControlBar = document.getElementById("nelsonATCAControlBar");
	var nelsonATCAContainer = "";
	var prefixes = ['', '-ms-','-moz-', '-webkit-', '-khtml-', '-o-'];
	nelsonAddtoCartAnimation = {
		a:"",
		b:"",
		c:"",
		startX:"",
		startY:0,
		endX:"",
		endY:0,
		second:0,
		speed:10,
		/*初始化‘小球’的位置*/
		init:function(startX,endX,rC,txt){
			if(!document.getElementById("nelsonATCAContainer")){
				var _nelsonATCAContainer = document.createElement("div");
				_nelsonATCAContainer.className = "nelsonATCAContainer";
				_nelsonATCAContainer.id = "nelsonATCAContainer";
				_nelsonATCAContainer.innerText = txt?txt:"";
				_nelsonATCAContainer.style.left = startX + "px";
				nelsonATCAControlBar.appendChild(_nelsonATCAContainer);
				nelsonATCAContainer = _nelsonATCAContainer;
				_nelsonATCAContainer = null;
				this.startX = startX;
				this.endX = endX;
				this.formula(rC);
				this.second = Math.abs(startX - endX) * this.speed / 1000;
				return this;
			}
		},
		/*计算常量*/
		formula:function(rC){
			var centerX =  (this.startX - this.endX) / 2 + this.endX;
			this.a = rC;
			this.b = -2 * this.a * centerX;
			this.c = -1 * this.a * this.startX * this.startX - this.b * this.startX;
		},
		/*开始漂移*/
		move:function(){
			var that = this;
			for(var i in prefixes){
				nelsonATCAContainer.style[prefixes[i] + prefixes[i]?"A":"a" + "nimation"] = "moveAnimation " + that.second + "s forwards";
			}
			nelsonATCAContainer.style.display = "block";
			var s = setInterval(function(){
				var startLeft = nelsonATCAContainer.offsetLeft;
				if(startLeft <= that.endX){
					clearInterval(s);
					that.resetPosition();
					return that;
				}
				nelsonATCAContainer.style.left = startLeft - 1 + "px";
				startLeft = nelsonATCAContainer.offsetLeft;
				nelsonATCAContainer.style.top = that.a * startLeft * startLeft + that.b * startLeft + that.c + "px";
			},that.speed)
		},
		/*重置小球初始状态*/
		resetPosition:function(){
			nelsonATCAContainer.style.display = "none";
			nelsonATCAContainer.style.left = this.startX + "px";
			nelsonATCAContainer.style.top = this.startY + "px";
			
		},
		/*设置小球中的数字*/
		setValue:function(value){
			nelsonATCAContainer.innerText = value;
		}
	}
})()