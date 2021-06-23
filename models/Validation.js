function Validation(){

    // Error Require Validation
    this.kiemTraRong = function(value,selectorError,name){
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !'
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    // Error All Number Validation
    this.kiemTraSo = function(value,selectorError,name){
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ, mời nhập lại !';
        return false;
    }

    // Error All Letter Validation
    this.kiemTraTatCaKyTu = function(value,selectorError,name){
        var regexLetter = /^[A-Z a-z]+$/;
        if (regexLetter.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ, mời nhập lại !';
        return false; 
    }

    this.kiemTraDoDai = function(value,selectorError,minLength,maxLength,name){
        if (value < minLength || value > maxLength){
            document.querySelector(selectorError).innerHTML = `${name} phải từ ${minLength} tới ${maxLength} kí tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai_1 = function(value,selectorError,minLength,maxLength,name){
        if (value < minLength || value > maxLength){
            document.querySelector(selectorError).innerHTML = `${name} phải từ ${minLength} VND tới ${maxLength} VND`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai_2 = function(value,selectorError,minLength,maxLength,name){
        if (value < minLength || value > maxLength){
            document.querySelector(selectorError).innerHTML = `${name} phải từ ${minLength} tới ${maxLength} giờ`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}