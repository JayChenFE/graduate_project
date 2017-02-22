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

		this.currentUser = this.getCurrentUser();
		if (this.currentUser) {
			var query = new AV.Query('AllTodos');
			query.find()
				.then((todos) => {
					let avAllTodos = todos[0];
					this.todoList = JSON.parse(avAllTodos.attributes.content);
					this.todoList.id = avAllTodos.id;
				}, function(error) {
					console.error(error);
				});
		}

	},
	methods: {

		fetchTodos: function() {
			if (this.currentUser) {
				var query = new AV.Query('AllTodos');
				query.find()
					.then((todos) => {
						let avAllTodos = todos[0];
						let id = avAllTodos.id;
						this.todoList = JSON.parse(avAllTodos.attributes.content);
						this.todoList.id = id;
					}, function(error) {
						console.error(error);
					});
			}
		},

		updateTodos: function() {

			let dataString = JSON.stringify(this.todoList);

			let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
			avTodos.set('content', dataString);
			avTodos.save().then(() => {
				console.log('更新成功');
			});
		},

		saveTodos: function() {
			let dataString = JSON.stringify(this.todoList);
			var AVTodos = AV.Object.extend('AllTodos');
			var avTodos = new AVTodos();
			var acl = new AV.ACL();
			acl.setReadAccess(AV.User.current(), true); // 只有这个 user 能读
			acl.setWriteAccess(AV.User.current(), true); // 只有这个 user 能写

			avTodos.set('content', dataString);
			avTodos.setACL(acl); // 设置访问控制
			avTodos.save().then((todo) => {
				this.todoList.id = todo.id; // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
				console.log('保存成功');
			}, function(error) {
				alert('保存失败');
			});
		},

		saveOrUpdateTodos: function() {
			if (this.todoList.id) {
				this.updateTodos();
			} else {
				this.saveTodos();
			}
		},

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
			this.saveOrUpdateTodos();
		},

		removeTodo: function(todo) {
			let index = this.todoList.indexOf(todo);
			this.todoList.splice(index, 1);
			this.saveOrUpdateTodos();
		},

		signUp: function() {
			let user = new AV.User();
			user.setUsername(this.formData.username);
			user.setPassword(this.formData.password);
			user.signUp().then((loginedUser) => {
				this.currentUser = this.getCurrentUser();
			}, (error) => {
				alert("注册失败");
				console.log(error);
			});
		},

		login: function() {
			AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
				this.currentUser = this.getCurrentUser();
				this.fetchTodos();
			}, (error) => {
				alert('登录失败');
				console.log(error);
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