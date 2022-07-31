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
    var staffWorkday = document.querySelector("#datepicker").value
    var staffSalary = document.querySelector("#luongCB").value
    var staffPositon = document.querySelector("#chucvu").value
    var staffWorktime = document.querySelector("#gioLam").value
    2// Tao đối tượng Nhân Viên Mới
    var staff = new Staff(
        staffUser,
        staffName,
        staffEmail,
        staffWorkday,
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
    var upStaff = new Staff()
    upStaff.user = document.getElementById("tknv").value
    var up = -1
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].user === upStaff.user) {
            up = i
            break
        }
    }
    if (up !== -1) {
        document.querySelector("#tknv").value = up.user
        document.querySelector("#name").value = up.name
        document.querySelector("#email").value = up.email
        document.querySelector("#datepicker").value = up.workingday
        document.querySelector("#chucvu").value = up.position
        document.querySelector("#gioLam").value = up.staffWorktime
        document.querySelector("#password").value = up.pass
        document.querySelector("#luongCB").value = up.salary
    }
}
updateStaff()

