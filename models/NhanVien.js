class NhanVien {
  constructor(manv, tennv, chucvu, luongcoban, sogiolam) {
    this.maNhanVien = manv;
    this.tenNhanVien = tennv;
    this.chucVu = chucvu;
    this.luongCoBan = luongcoban;
    this.soGioLam = sogiolam;
    this.tinhTongLuong = function () {
      var tongLuong = (Number(this.luongCoBan) * Number(this.soGioLam));
      return tongLuong;
    };
    this.xepLoaiNhanVien = function () {
      var layTongLuong = this.tinhTongLuong();
      var output = "";
      if (layTongLuong >= 20000000) {
        output = "Nhân viên xuất sắc";
      } else if (layTongLuong >= 15000000 && layTongLuong < 20000000) {
        output = "Nhân viên giỏi";
      } else if (layTongLuong >= 10000000 && layTongLuong < 15000000) {
        output = "Nhân viên Khá";
      } else if (layTongLuong >= 5000000 && layTongLuong <= 10000000) {
        output = "Nhân viên thường";
      } else if (layTongLuong < 5000000) {
        output = "Nhân viên kém";
      }

      return output;
    };

  }
}
