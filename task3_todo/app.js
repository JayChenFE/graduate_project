import Vue from 'vue'
import utils from './utils'

var app = new Vue({
	el: '#app',
	data: {
		newTodo: '',
		todoList: []
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
		}
	}
});