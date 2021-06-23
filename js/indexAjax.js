function getNhanVienApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    });

    // nếu thành công
    promise.then(function (result) {
        console.log('result', result.data);
        renderTableNhanVien(result.data);
    });

    // nếu thất bại
    promise.catch(function (errors) {
        console.log('errors', errors);
    });
}

//Gọi hàm khi người dùng vừa vào web
getNhanVienApi();
function renderTableNhanVien(arrNV) {
    var content = "";
    for (var index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];
        // Mỗi lần duyệt lấy ra một đối tượng nhân viên
        var nhanVien = new NhanVien(
            nv.maNhanVien,
            nv.tenNhanVien,
            nv.chucVu,
            nv.luongCoBan,
            nv.soGioLam
        );

        // Từ đối tượng nhân viên => tạo bảng tr
        var trNhanVien =
            `
              <tr>
                  <td>${nhanVien.maNhanVien}</td>
                  <td>${nhanVien.tenNhanVien}</td>
                  <td>${nhanVien.chucVu}</td>
                  <td>${nhanVien.luongCoBan}</td>
                  <td>${nhanVien.tinhTongLuong()}</td>
                  <td>${nhanVien.soGioLam}</td>
                  <td>${nhanVien.xepLoaiNhanVien()}</td>
                  <td>
                  <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                  <button class="btn btn-primary" onclick="suaThongTin('${nhanVien.maNhanVien}')">Chỉnh sửa</button>
                  </td>
              </tr>
      `;
        content += trNhanVien;
    }

    // Dom tới thẻ tblNhanVien chèn chuỗi content vào innerHTML
    document.querySelector("#tblNhanVien").innerHTML = content;
}
//------------------------------- Thêm nhân viên -----------------------------------
var kiemTraDuLieu = new Validation();
document.querySelector('#btnThemNhanVien').onclick = function (event) {
    event.preventDefault();

    // Lấy thông tin từ người nhập
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLam = document.querySelector('#soGioLam').value;

    console.log('nhanVien', nhanVien);

    //--------------------------------- VALIDATION ---------------------------------------------
    var valid = true;

    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_require_maSinhVien', 'Mã nhân viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_require_tenNhanVien', 'Tên nhân viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_require_luongCoBan', 'Lương cơ bản')
        & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLam, '#error_require_soGioLam', 'Số giờ làm');

    // Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maSinhVien', 4, 6, 'Mã sinh viên');
    valid &= kiemTraDuLieu.kiemTraDoDai_1(nhanVien.luongCoBan, '#error_min_max_length_luongCoBan', 1000000, 20000000, 'Lương cơ bản');
    valid &= kiemTraDuLieu.kiemTraDoDai_2(nhanVien.soGioLam, '#error_min_max_length_soGioLam', 50, 150, 'Số giờ làm');

    // Kiểm tra kí tự
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');

    // Kiểm tra số
    valid &= kiemTraDuLieu.kiemTraSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản')
        & kiemTraDuLieu.kiemTraSo(nhanVien.soGioLam, '#error_allNumber_soGioLam', 'Số giờ làm');


    // nếu valid = false thì return kiểm tra lại không chạy được xuống dòng tiếp theo
    if (!valid) {
        return;
    }

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien // dữ liệu phải đúng dữ liệu
    });

    // nếu thành công
    promise.then(function (result) {
        console.log('result', result.data);

        getNhanVienApi();
    });

    // nếu thất bại
    promise.catch(function (error) {
        console.log('error', error);
    });
}

//-------------------------------Xóa nhân viên-------------------------------------------
function xoaNhanVien(maNhanVienClick) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE',
    });

    promise.then(function (result) {
        console.log('result', result.data);
        getNhanVienApi();
    });
    promise.then(function (error) {
        console.log('error', error.response.data);
    });
}

//------------------------------Sửa thông tin-----------------------------------------------
function suaThongTin(maSinhVien) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maSinhVien}`,
        method: 'GET',
    });

    promise.then(function (result) {
        console.log('result', result.data);
        // load dữ liệu lên input
        var nhanVien = result.data
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.chucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLam').value = nhanVien.soGioLam;

        // chỉnh lại các nút bấm
        document.querySelector('#maNhanVien').disabled = true;
        document.querySelector('#btnThemNhanVien').disabled = true;
        document.querySelector('#btnLuuThongTin').disabled = false;
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}

//------------------------------Cập nhật thông tin--------------------------------------------
document.querySelector('#btnLuuThongTin').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLam = document.querySelector('#soGioLam').value;

    // lấy api
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    });

    promise.then(function (result) {
        console.log('result', result.data);
        getNhanVienApi();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}

