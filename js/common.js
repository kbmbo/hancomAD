var i = 0;

// 크롬 외 브라우저 접속 시 안내 모달 스크립트
var ua = window.navigator.userAgent;
function browserVerification() {
    // alert("it's not chrome")
    //console.log('현재 접속한 환경: ' + ua)
}
// 모달 오픈 후 닫기 버튼 클릭시 작동하는 스크립트
// $(".modalCloseBtn").click(function(){
//     $(".modalPopup").removeClass("on");
//     $(".modalPopup > div").removeClass("on");
//     $('.modalBg').removeClass("on");
//     $('body').css('overflow','auto');
//     $('body').attr('scroll','yes');
// });
if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0) {
    // IE
	browserVerification();
} else if (navigator.userAgent.toLowerCase().indexOf("edge") > -1) {
    // IE Edge
	browserVerification();
} else if (ua.indexOf("Opera") > 0 || ua.indexOf("OPR") > 0) {
    // Opera
	browserVerification();
} else if (ua.indexOf("Firefox") > 0) {
    // Firefox
	browserVerification();
} else if (ua.indexOf("Safari") > 0) {
	if (ua.indexOf("Chrome") > 0) {
        // Chrome
	} else if (ua.indexOf("Safari") > 0) {
        // Safari
		browserVerification();
    }
}
// 크롬 외 브라우저 접속 시 안내 모달 스크립트 End

var magnificPopup;
var common = {};
//html 로드:s
document.addEventListener("DOMContentLoaded", function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                    common.daterangepicker();
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
    //footer 내용
    document.getElementById("footer").innerHTML="<p>Copyright(c) 2021 모비온 All rights reserved.</p>"
});
//html 로드:e
// 메뉴
common.menu = function (){
    // 유저 메뉴 작동
	$(".userMenu > button").on("click", function() {
		$(".userMenu ul").stop().slideToggle(300);
  });
    // 유저 메뉴 작동 End
    // 햄버거 메뉴 작동
	$("#hamburger").on("click", function() {
		$("#nav").toggleClass("minimization");
		$(".navBG").toggleClass("minimization");
		$("#sectionWrap, #footer").toggleClass("Maximize");
		$(".depth > li > ul").slideUp(100);
		$(".depth li").removeClass("on");
    });
    // 햄버거 메뉴 작동 End

    // 2depth 메뉴 클릭 이벤트
	$(".depth > li > a").on("click", function() {
		let mini = $("#nav").hasClass("minimization");
		$(this)
			.parent()
			.toggleClass("on");
        if(mini === true){
			$(".depth > li > ul").slideUp(100);
			$(".depth li").removeClass("on");
        }
        $(this).next().stop().slideToggle(200);
    });
    // 2depth 메뉴 클릭 이벤트 End

    // 3depth 메뉴 클릭 이벤트
	$(".threeDepthMenu > a").on("click", function() {
		$(this).next().stop().slideToggle(200);
		$(this).parent().toggleClass("on");
    });
    // 3depth 메뉴 클릭 이벤트 End
    
    $(document).on("click",".chartTap li,.page-nav-box li,.tapList li,.subMenu-list li", function() {//addClass active 이벤트
      $(this).addClass('active').siblings().removeClass('active');
    });
    
};
// 메뉴
// sectionNav 공통 script
function sectionNavLocation() {
    let locationTop = $(window).scrollTop();
    if (locationTop > 50) {
		$(".SectionNav").css("top", locationTop + 182 + "px");
    }
}
$(window).scroll(function(){
	sectionNavLocation();
});
$(function(){
	sectionNavLocation();
});
// sectionNav 공통 script End






common.daterangepicker = function (){
  // 날짜 선택 script    
	$(".dateInput").daterangepicker(
		{
            autoApply: true,
            locale: {
                    format: "YYYY-MM-DD",
                    daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                    monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"]
            },
            ranges: {

                '오늘': [moment(), moment()],
                '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '이번달': [moment().startOf('month'), moment().endOf('month')],
                '전월': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                '전전월': [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')],
                '최근 7일': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
                '최근 30일': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
                '6개월': [
                    moment()
                        .subtract(6, "month")
                        .startOf("month"),
                    moment().subtract(2, "month").endOf("month"),
                ]
			},

		}
	);
    // The event listener here.
    $('.dateInput').on('apply.daterangepicker', (e, picker) => {
        //console.log('The value has changed.');
      //  setTimeout(function()
      //  {
            var tmpDate = $('#dateInput').val().split(' ~ ');

            frm.st_date.value = tmpDate[0];
            frm.en_date.value = tmpDate[1];

            document.frm.submit();
      //  },500);


    });


    $('.monthInput').monthpicker({
        pattern: 'yyyy-mm',
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    });
};


// common.tableResize = function (){
//   // 테이블 크기 산출 script
//   var tableWidth = 0;
// 	$(".tableSection").each(function() {
//     var $tableSection = $(this);
//     $(this).find("th").each(function() {
//       var e = $(this).outerWidth();
//       var index = $(this).index();
//       $tableSection.find("tbody tr").each(function() {$(this).find("td").eq(index).css("width", e + "px");});
//       $tableSection.find("tfoot tr").each(function() {
//       $(this).find("td").eq(index).css("width", e + "px");});
//       tableWidth += e;
//     });
// 		$(this).find("table").width(tableWidth);
//     tableWidth = 0;
//   });
//     // 테이블 크기 산출 script End
// };

// 모달 오픈 script
common.modal = function(){
    // 모달 사용법
    // 1. 클릭 대상에 클래스(modalOpen), modal속성(오픈할려고 하는 모달 id)를 추가
    // 2. modalOpen 클래스를 가진 타겟을 클릭하면 해당 타겟의 modal 속성값을 저장
    // 3. 변수로 modal 속성값을 id로 변환
    // 4. 해당 id 값을 가진 모달에 display block으로 모달 오픈
    // Close
    // 1. 윈도우 화면을 클릭하면 오픈되어 있는 모달 객체를 저장.
    // 2. 해당 id 값을 가진 객체가 모달 오픈시 저장해놨던 id 값을 가진 객체의 값이 같으면 display none으로 모달 종료
    saveModalName = null;
    $(document).on('click','.modalOpen', function(){
        saveModalName = $(this).data('modal');
        openTarget = $('#' + saveModalName);
        openTarget.css('display','block');
        $('body').css('overflow','hidden');
        $('body').attr('scroll','no');
    });
    $(document).on('click','.modalContent .cancel', function(){
        openTarget.css('display','none');
        $('body').css('overflow','auto');
        $('body').attr('scroll','yes');
    });   
	function modalClose(event) {
        var a = event.target;
        var b = a.id;
        if(b == saveModalName) {
            a.style.display = 'none';
            $('body').css('overflow','auto');
            $('body').attr('scroll','yes');
        }
    }
    window.onclick = function(event) {
        modalClose(event);
    }
};

// 모달 오픈 script End
// 전체 페이지 공통 script
$(function() {
	common.menu();
    //common.tableResize();
    common.modal();
	//지정일 선택
	$(".datepickSelect .inputBox span").click(function() {
		$(".dateLayer").fadeIn(200);
	});
	$(".dateLayer .btnBox .btn_cancel").click(function() {
		$(".dateLayer").fadeOut(300);
	});

	var fixedDate = $(".datepickSelect"),
		dateNum = fixedDate.find(".dateLayer strong em"),
		dateListNum = fixedDate.find(".dateLayer ul li a");

	dateListNum.click(function() {
		$(".dateLayer ul li a").removeClass("on");
		$(this).addClass("on");
		var numtxt = $(this).text();
		dateNum.text(numtxt);
		$(".dateLayer .btnBox .btn_confirm").click(function() {
			$(".dateLayer").fadeOut(300);
			$(".inputBox input[id='selectDay']").val(numtxt + "일");
			$(".inputBox input[name='standDttm']").val(numtxt);
		});
	});
});

// 개별 페이지 script
$(function(){
    // 날짜 선택 (오늘, 어제..) script
	$(".optionBox .date .datePeriod li").on("click", function() {
		$(".optionBox .date .datePeriod li").removeClass("on");
		$(this).toggleClass("on");
    });
    // 날짜 선택 (오늘, 어제..) script End
	// 폴딩 테이블에 사용되는 스크립트
	$(".folding_table .tableSection tbody > tr > .folding").on(
		"click",
		function() {
			$(this).toggleClass("on");
		}
	);
	// 폴딩 테이블에 사용되는 스크립트 End
	// Manager_ecpm_new(연동플랫폼 페이지내 테이블 버튼) :s
	/*$(document).on('click','.smemo_btn', function() {
		var el = $(this);
        if(el.hasClass('active')) {
			var txtArea= el.parent().find('.txtArea').val()
			el.parent().find('.smemo.txt').removeClass('none').text(txtArea);
            el.parent().find('.smemo_btn_cc,.txtArea').addClass('none');
            el.text('메모').removeClass('active');
            // $.ajax({
            //     url	: '/ad/ifr_admix_sort_list.php',
            //     type : 'POST',
            //     dataType : 'json',
            //     data : {
            //         mode : 'memo_save',
            //         mc : el.data('mc'),
            //         memo : txtArea
            //     },
            //     success	: function(aData) {
            //         if( aData.result == "OK" ) {
            //             el.parent().find('.smemo.txt').removeClass('none').text(txtArea);
            //             el.parent().find('.smemo_btn_cc,.txtArea').addClass('none');
            //             el.text('메모').removeClass('active');
            //             alert('저장되었습니다.');
            //         } else {
            //             alert('수정 중 문제가 발생하였습니다.');
            //         }
            //     }
            // });
        } else {
            el.parent().find('.smemo_btn_cc,.txtArea').removeClass('none');
			el.parent().find('.smemo.txt').addClass('none');
            el.text('저장').addClass('active');
        }
    });
	*/

    $('.smemo_btn_cc').on('click', function() {
        $(this).addClass('none').parent().find('.smemo_btn').removeClass('none').text('메모');
        $(this).parent().find('.smemo.txt').removeClass('none');
        $(this).parent().find('.txtArea').addClass('none');
    });

    /*$('.smemo.txt').on('click', function() {
        // open popup
        var mc = $(this).data('mc');
        window.open('/v2/admix_report/pop_admix_memo.php?mc='+mc,'pop_memo','resizable=yes,width=620,height=450,scrollbars=yes,top=0,screenX=0,screenY=0');
    });*/
	// Manager_ecpm_new(연동플랫폼 페이지내 테이블 버튼) :e

	//테이블내 값 수정 - JB
	$(".edit-input").each(function() {
		var $this = $(this);
		$(this)
			.find(".edit")
			.click(function() {
			$this.hide();
				$this.next(".edit-input-save").show();
		});
	});
	$(".edit-input-save").each(function() {
		var $this = $(this);
		$this.find("button").click(function() {
			$this.hide();
			$this.prev(".edit-input").show();
		});
		});
});

// 전체 선택 스크립트
$(document).on("click", '.allCheckItems input[name="allCheckbox"]', function() {
	var valueCheck = $(this).prop("checked");
    if(valueCheck === true){
		$(this).closest(".checkboxArea").find("input[type=checkbox]").prop("checked", true);
    } else if(valueCheck === false) {
		$(this).closest(".checkboxArea").find("input[type=checkbox]").prop("checked", false);
    }
});
$(document).on("click", ".allCheckItems input[type=checkbox]", function() {
	var selectName = $(this).attr("name");
	var deselectAll = $(this).closest(".checkboxArea").find('input[name="' + selectName + '"]').length;
    var selectCount = 0;
	$(this).closest(".checkboxArea").find('input[name="' + selectName + '"]').each(function() {
			var deselectCount = $(this).prop("checked");
			if(deselectCount === true){
				selectCount += 1;
			}
    });
    if(selectCount === 0){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", false);
    } else if(selectCount === deselectAll){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", true);
    } else if(selectCount !== deselectAll){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", false);
    }
});
// 전체 선택 스크립트 End


function uncomma(str) {
    str = String(str);
	return str.replace(/[^\d]+/g, "");
}

function comma(str) {
	str = String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    return str;
}

//3자리 단위마다 콤마 생성
function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//모든 콤마 제거
function removeCommas(x) {
    if(!x || x.length === 0) return "";
    else return x.split(",").join("");
}

// 숫자만 입력받는 함수
// // 사용방법 클래스 .numberInput 추가
// $(".numberInput").on("focus", function() {
//     var x = $(this).val();
//     x = removeCommas(x);
//     $(this).val(x);
// }).on("focusout", function() {
//     var x = $(this).val();
//     if(x && x.length > 0) {
//         if(!$.isNumeric(x)) {
//             x = x.replace(/[^0-9]/g,"");
//         }
//         x = addCommas(x);
//         $(this).val(x);
//     }
// }).on("keyup", function() {
//     $(this).val($(this).val().replace(/[^0-9]/g,""));
// });
// // 숫자만 입력받는 함수 End

//노출비율설정 입력값 팝업관련:s
$(document).on('keyup','input.sum',function () {
    var sum = 0;
    $('input.sum').each(function(){ 
        sum += Number($(this).val()); 
    });
    if(sum > 100){
        $('#pop_exposure_ratio p').empty().append('총 합계는 100%을 넘을 수 없습니다.');
        $('#pop_exposure_ratio').find('.save').addClass('none');
        $(".sumTotal").addClass('red');
        
    } else{
        $('#pop_exposure_ratio p').empty().append('<span class="sat">노출비율</span>을 저장하시겠습니까?');
        $('#pop_exposure_ratio').find('.save').removeClass('none');
        $(".sumTotal").removeClass('red');
    }
    $(".sumTotal > span").text(sum);
    $(".sumTotalVal").val(sum);
});
//노출비율설정 입력값 팝업관련:e

//fullCalendar:s
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('fullCalendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        //initialDate: '',
        headerToolbar: {
            left: '',
            center: 'title',
            right: ''
        },
        locale: 'ko',
        fixedWeekCount: false,
        titleFormat: {year: 'numeric', month: 'long'},
        contentHeight:'auto',
    });
    calendar.render();
    var fcList = '<div class="fc-txt">';
    fcList += '<p>확정 트래픽 : '+'2,000'+'</p>';
    fcList += '<p>총 노출수 : '+'1,500'+'</p>';
    fcList += '<p>캠페인 매출: '+'10,000'+'</p>';
    fcList += '<button onclick="window.open();">'+'캠페인리스트</button>';
    fcList += '</div>';

    var fcList2 = '<div class="fc-txt">';
    fcList2 += '<p>예상 트래픽 : '+'2,000'+'</p>';
    fcList2 += '<p>예상 노출수 : '+'1,500'+'</p>';
    fcList2 += '<p class="red bold">예상잔여트래픽: '+'10,000'+'</p>';
    fcList2 += '<p class="red bold">배당가능한노출수: '+'10,000'+'</p>';
    fcList2 += '<button onclick="window.open();">'+'캠페인리스트</button>';
    fcList2 += '</div>';

    $('td.fc-daygrid-day.fcList2').find('.fc-daygrid-day-events').append(fcList2);
    $('td.fc-daygrid-day.fcList').find('.fc-daygrid-day-events').append(fcList);
});
//fullCalendar:e