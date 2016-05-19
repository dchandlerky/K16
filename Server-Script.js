// populate the 'data' object
// e.g., data.table = $sp.getValue('table');
data.userID = gs.getUserID();

if (input && input.action === "add_task") {
	var newTaskGR = new GlideRecord("vtb_task");
	newTaskGR.initialize();
	newTaskGR.setValue("description", input.newTask.description);
	newTaskGR.setValue("state", 2);
	newTaskGR.insert();
}

if (input && input.action === "complete_task") {
	var updatedTaskGR = new GlideRecord("vtb_task");
	if (updatedTaskGR.get(input.completedTask.sys_id)) {
		updatedTaskGR.state = 3;
		updatedTaskGR.update();
	}
}

if (input && input.action === "clear_completed_tasks") {
	var completedTasksGR = new GlideRecord("vtb_task");
	completedTasksGR.addQuery("owner", data.userID);
	completedTasksGR.addQuery("state", 3);
	completedTasksGR.deleteMultiple();
}


data.tasks = [];

var personalTaskGR = new GlideRecord("vtb_task");
personalTaskGR.addQuery("owner", data.userID);
personalTaskGR.addQuery("state", 2);
personalTaskGR.orderByDesc("sys_updated_on");
personalTaskGR.query();

while(personalTaskGR.next()) {
	var task = {};
	task.description = personalTaskGR.getValue("description");
	task.sys_id = personalTaskGR.getUniqueValue();
	data.tasks.push(task);
}
