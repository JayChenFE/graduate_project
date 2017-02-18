import Vue from 'vue'
import utils from './utils'

import AV from 'leancloud-storage'

var APP_ID = '4Kj8kDwq1x9uBneAE8Oy60XR-gzGzoHsz';
var APP_KEY = 'j36yLuYUklebwr0i3fkBBqAq';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

//leancloud测试代码
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

var app = new Vue({
	el: '#app',

	data: {
		actionType: 'signUp',
		formData: {
			username: '',
			password: ''
		},
		newTodo: '',
		todoList: [],
		currentUser: null,
	},

	created: function() {

		var TODODATA_KEY = 'myTodos';
		var NEWTODO_KEY = 'myNewTodo';

		//载入界面时从localStorage中取出保存数据
		window.onbeforeunload = () => {
			utils.putLocalData(TODODATA_KEY, this.todoList);
			utils.putLocalData(NEWTODO_KEY, this.newTodo);
		};

		let oldData = utils.getLocalData(TODODATA_KEY);
		this.todoList = oldData || [];
		this.currentUser = this.getCurrentUser();

		let oldTodo = utils.getLocalData(NEWTODO_KEY);
		this.newTodo = oldTodo || '';
	},

	methods: {

		addTodo: function() {

			if (!/\S/g.test(this.newTodo)) {
				return alert('输入不能为空');
			}

			this.todoList.push({
				title: this.newTodo,
				createdAt: utils.formatDate(new Date()),
				done: false
			});
			this.newTodo = '';
		},

		removeTodo: function(todo) {
			let index = this.todoList.indexOf(todo);
			this.todoList.splice(index, 1);
		},

		signUp: function() {
			let user = new AV.User();
			user.setUsername(this.formData.username);
			user.setPassword(this.formData.password);
			user.signUp().then((loginedUser) => {
				this.currentUser = this.getCurrentUser();
			}, (error) => {
				alert("注册失败");
			});
		},

		login: function() {
			AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
				this.currentUser = this.getCurrentUser();
			}, (error) => {
				alert('登录失败');
			});
		},

		getCurrentUser: function() {
			var current = AV.User.current();
			if (current) {
				var id = current.id,
					createdAt = current.createdAt,
					username = current.attributes.username;

				return {
					id: id,
					username: username,
					createdAt: createdAt
				}; 
			} else {
				return null;
			}
		},

		logout: function() {
			AV.User.logOut();
			this.currentUser = null;
			window.location.reload();
		}
	},

});