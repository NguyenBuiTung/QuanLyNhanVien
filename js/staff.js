/**
 * Thêm 1 Nhân Viên Mới
 */
function Staff(user,name,email,workingday,position,salary,worktime,pass,typestaff){
    this.user=user
    this.name=name
    this.email=email
    this.workingday=workingday
    this.position=position
    this.salary=salary
    this.worktime=worktime
    this.pass=pass
    this.calcGPA=function(){
        return this.salary
    }
    this.xeploai=function(){
        return this.worktime
    }
}