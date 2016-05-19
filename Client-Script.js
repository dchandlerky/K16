function() {
	var c = this;
	c.newTask = "";
	
	c.createTask = function() {
		if (c.newTask.length === 0) return;
		
		c.data.newTask = {
			description: c.newTask
		}
		c.data.action = "add_task";
		c.newTask = "";
		c.server.update();
	}
	
	c.markTaskComplete = function($event, task) {
		c.data.completedTask = task;
		c.data.action = "complete_task";
		c.server.update();
	}
	
	c.clearCompletedTasks = function() {
		c.data.action = "clear_completed_tasks";
		c.server.update();
	}
}
