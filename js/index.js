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
    saveLocalStorage(staffList, "arrStaff")
}
function renderStaff(arrNv) {
    var output = ""
    var obStaff;
    for (var i = 0; i < arrNv.length; i++) {
        obStaff = arrNv[i]
        obStaff.calcGPA = function () {
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
        obStaff.xeploai = function () {
            var string = ""
            if (this.worktime > 192) {
            string="Xuất Sắc"
            return string
            }
        }
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
    saveLocalStorage(staffList, "arrStaff")
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
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

/**
 * Hàm lưu trữ object ({}) hoặc array{[]} vào localstorage
 * @param {*} ob Dữ liệu cần lưu
 * @param {*} key KeyName trong localstorage
 */
function saveLocalStorage(ob, key) {//{},[]
    var str = JSON.stringify(ob)
    localStorage.setItem(key, str)
}

/**
 * Hàm nhận vào keyname để lấy ra giá trị từ LocalStorage theo key đó
 * @param {*} key :tên của item trong localstorage
 * @returns trả về obj lấy đc ra theo key
 */
function getLocalStorage(key) {
    //Lấy dữ liệu từ localStorage ra(dữ liệu đây là string)
    if (localStorage.getItem(key)) {
        var str = localStorage.getItem(key)
        //parse dữ liệu về lại obj
        var ob = JSON.parse(str)
        return ob
    }
    return undefined
}

//đợi html css load xong sẽ tự động thực thi
window.onload = function () {
    staffList = getLocalStorage("arrStaff")
    renderStaff(staffList)
}

