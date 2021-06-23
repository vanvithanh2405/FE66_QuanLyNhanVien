





var arrNhanVien = [];
var kiemTraDuLieu = new Validation();
document.querySelector("#btnThemNhanVien").onclick = function (event) {
  event.preventDefault();

  var nhanVien = new NhanVien();

  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLam = document.querySelector("#soGioLam").value;
  console.log("nhanVien", nhanVien);
  // Tính tổng lương
  var tongLuong = nhanVien.tinhTongLuong();
  var xepLoaiNV = nhanVien.xepLoaiNhanVien();

  //--------------------------------- VALIDATION ---------------------------------------------
  var valid = true;

  valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien , '#error_require_maSinhVien','Mã nhân viên') 
  & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_require_tenNhanVien','Tên nhân viên')
  & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_require_luongCoBan', 'Lương cơ bản') 
  & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLam , '#error_require_soGioLam','Số giờ làm');

  // Kiểm tra độ dài
  valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maSinhVien',4,6,'Mã sinh viên');
  valid &= kiemTraDuLieu.kiemTraDoDai_1(nhanVien.luongCoBan, '#error_min_max_length_luongCoBan',1000000,20000000,'Lương cơ bản');
  valid &= kiemTraDuLieu.kiemTraDoDai_2(nhanVien.soGioLam,'#error_min_max_length_soGioLam',50,150,'Số giờ làm');

  // Kiểm tra kí tự
  valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien,'#error_allLetter_tenNhanVien','Tên nhân viên');

  // Kiểm tra số
  valid &= kiemTraDuLieu.kiemTraSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản')
  & kiemTraDuLieu.kiemTraSo(nhanVien.soGioLam, '#error_allNumber_soGioLam', 'Số giờ làm');
  
  
  // nếu valid = false thì return kiểm tra lại không chạy được xuống dòng tiếp theo
  if (!valid){
    return;
  }




  arrNhanVien.push(nhanVien);
  console.log("nhanVien", arrNhanVien);
  renderTableNhanVien(arrNhanVien);
};

function renderTableNhanVien(arrNV) {
  var content = "";
  for (var i = 0; i < arrNV.length; i++) {
    var nv = arrNhanVien[i];
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
