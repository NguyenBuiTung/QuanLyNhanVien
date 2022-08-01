/**
 * 1.Thêm Nhân Viên mới
 * 2.In ra table danh sách nhân viên
 * 3.Xóa Nhân Viên
 * 4.Cập Nhật Nhân Viên
 * 5.Tìm Nhân Viên
 * Phân Tích lớp đối tượng:Staff
+Tài khoản
+Họ tên
+Email
+Mật khẩu
+Ngày làm
+Lương cơ bản
+Chức vụ gồm: Giám đốc, Trưởng Phòng, Nhân Viên
+Giờ làm trong tháng
+Tổng lương
+Loại nhân viên

*Validation
+ Tài khoản tối đa 4 - 6 ký số, không để trống
+ Tên nhân viên phải là chữ, không để trống
+ Email phải đúng định dạng, không để trống
+ mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
để trống
+ Ngày làm không để trống, định dạng mm/dd/yyyy
+ Lương cơ bản 1 000 000 - 20 000 000, không để trống
+ Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
+ Số giờ làm trong tháng 80 - 200 giờ, không để trống

*Xây dựng phương thức tính tổng lương cho đối tượng nhân viên
+nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
+nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
+nếu chức vụ là nhân viên: tổng lương = lương cơ bản *

*Xây dựng phương thức xếp loại cho đối tượng nhân viên:
+nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
+nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
+nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
+nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình
 */

var staffList = []
function createStaff() {
    //Lấy thông tin từ input
    var staffUser = document.querySelector("#tknv").value
    var staffName = document.querySelector("#name").value
    var staffEmail = document.querySelector("#email").value
    var staffPass = document.querySelector("#password").value
    var staffWorkingday = document.querySelector("#datepicker").value
    var staffSalary = document.querySelector("#luongCB").value
    var staffPositon = document.querySelector("#chucvu").value
    var staffWorktime = document.querySelector("#gioLam").value
    2// Tao đối tượng Nhân Viên Mới
    var staff = new Staff(
        staffUser,
        staffName,
        staffEmail,
        staffWorkingday,
        staffPositon,
        staffSalary,
        staffPass,
        staffWorktime,
    )
    //3.Push Đối tượng Nhân Viên vào danh sách
    staffList.push(staff)
    renderStaff(staffList)
}
function renderStaff(arrNv) {
    var output = ""
    var obStaff;
    for (var i = 0; i < arrNv.length; i++) {
        obStaff = arrNv[i]
        var trNv = `
        <tr>
        <td>${obStaff.user}</td>
        <td>${obStaff.name}</td>
        <td>${obStaff.email}</td>
        <td>${obStaff.workingday}</td>
        <td>${obStaff.position}</td>
        <td>${obStaff.calcGPA()}</td>
        <td>${obStaff.xeploai()}</td>
        <td>
        <button class="btn btn-success" onclick="delStaff('${obStaff.user}')">Delete</button>
        </td>
        </tr>
        `
        output += trNv
    }
    document.querySelector("#tableDanhSach").innerHTML = output
}
/**
 * hàm chức năng xóa nhân viên
 * @param {*} userClick 
 */
function delStaff(userClick) {
    var indexStaff = -1
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].user === userClick) {
            indexStaff = i
            break
        }
    }
    if (indexStaff !== -1) {
        staffList.splice(indexStaff, 1)
    }
    renderStaff(staffList)
}
function updateStaff() {
    // alert(123)
    var staffUpdate = new Staff()
    staffUpdate.user = document.querySelector("#tknv").value
    staffUpdate.name = document.querySelector("#name").value
    staffUpdate.email = document.querySelector("#email").value
    staffUpdate.workingday = document.querySelector("#datepicker").value
    staffUpdate.position = document.querySelector("#luongCB").value
    staffUpdate.salary = document.querySelector("#chucvu").value
    staffUpdate.worktime = document.querySelector("#gioLam").value
    staffUpdate.pass = document.querySelector("#password").value
    // console.log(staffUpdate)
    //Duyệt qua từng obj trong studentList tìm ra vị trí của obj cần thay đổi 
    var indexEdit = -1
    for (i = 0; i < staffList.length; i++) {
        if (staffList[i].user === staffUpdate.user) {
            indexEdit = i
            break
        }
    }
    if (indexEdit !== -1) {
        //nếu tìm thấy vị trí trong mảng thì lấy obj trong mảng gắn lại bằng obj trên giao diện người dùng thay đổi
        staffList[indexEdit].name = staffUpdate.name
        staffList[indexEdit].email = staffUpdate.email
        staffList[indexEdit].workingday = staffUpdate.workingday
        staffList[indexEdit].salary = staffUpdate.salary
        staffList[indexEdit].position = staffUpdate.position
        staffList[indexEdit].worktime = staffUpdate.worktime
        staffList[indexEdit].pass = staffUpdate.pass
        //gọi hàm rendertable truyền cho mảng mới
        renderStaff(staffList)
    }
}

