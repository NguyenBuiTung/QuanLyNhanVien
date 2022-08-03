/**
 * Thêm 1 Nhân Viên Mới
 */
function Staff(user, name, email, workingday, position, salary, worktime, pass) {
    this.user = user
    this.name = name
    this.email = email
    this.workingday = workingday
    this.position = position
    this.salary = salary
    this.worktime = worktime
    this.pass = pass
    this.calcGPA = function () {
        if (this.position === "sep") {
            return this.salary * 3
        }
        if (this.position === "truongphong") {
            return this.salary * 2
        }
        if (this.position === "nhanvien") {
            return this.salary * 1
        }
    }
    this.xeploai = function () {
       
    }
}