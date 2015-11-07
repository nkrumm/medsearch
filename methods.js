Meteor.methods({
  
  submitMeds(text){
    inputs = text.split("\n")
                 .filter((item) => {return item !== ""})
                 .map((item) => {
                    medname = item.split(" ")[0]
                    res = Medications.findOne({name: {"$regex": "^" + medname.toUpperCase()}})
                    return {
                      name: medname,
                      line: item,
                      medclass: (res || {class: "unknown"}).class
                    }
                 })

    return inputs
  }

  // addTask(text) {
  //   // Make sure the user is logged in before inserting a task
  //   if (! Meteor.userId()) {
  //     throw new Meteor.Error("not-authorized");
  //   }
 
  //   Tasks.insert({
  //     text: text,
  //     createdAt: new Date(),
  //     owner: Meteor.userId(),
  //     username: Meteor.user().username
  //   });
  // },
 
  // removeTask(taskId) {
  //   Tasks.remove(taskId);
  // },
 
  // setChecked(taskId, setChecked) {
  //   Tasks.update(taskId, { $set: { checked: setChecked} });
  // }
});