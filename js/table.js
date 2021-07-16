var table = {};

table.index = 0;

table.option = {
    scrollCollapse: true,
    paging: false,
    info: false ,
    sDom: 't',
    order: [],
    language: {
        "emptyTable": "조회된 데이터가 없습니다." ,
        "zeroRecords" : "조회된 데이터가 없습니다." ,
        "sLoadingRecords" : "데이터를 불러오는 중입니다."
    }
};

$.fn.dataTable.defaults.column.asSorting = ['desc', 'asc'];

table.dataTable = function (doc){
    var dataTable = $(doc).DataTable(table.option);
    return dataTable;
};

table.column = function(doc, dataTable, hiddenColumns, hiddenColumnTexts){
	if (typeof dataTable !== "undefined" && typeof hiddenColumns !== "undefined" && hiddenColumns !== null) {
		for (var colIdx = 0; colIdx < hiddenColumns.length; colIdx++) {
    		dataTable.column(hiddenColumns[colIdx]).visible(false);
            $("#searchForm").prepend("<input type='hidden' name='hiddenColumn[]' class='hiddenColumn"+hiddenColumns[colIdx]+"' value='"+hiddenColumns[colIdx]+"' />");
            if ($("#mediaSettingForm").length > 0) {
                $("#mediaSettingForm").prepend("<input type='hidden' name='hiddenColumn[]' class='hiddenColumn" + hiddenColumns[colIdx] + "' value='" + hiddenColumns[colIdx] + "' />");
            }
		}
	}

    if (typeof dataTable !== "undefined" && typeof hiddenColumnTexts !== "undefined" && hiddenColumnTexts !== null) {
        for (var colIdx = 0; colIdx < hiddenColumnTexts.length; colIdx++) {
        	try {
            dataTable.column(hiddenColumnTexts[colIdx]).visible(false);
            $("#searchForm").prepend("<input type='hidden' name='hiddenColumnText[]' class='hiddenColumnText"+colIdx+"' value='"+hiddenColumnTexts[colIdx]+"' />");
            if ($("#mediaSettingForm").length > 0) {
                $("#mediaSettingForm").prepend("<input type='hidden' name='hiddenColumnText[]' class='hiddenColumnText" + colIdx + "' value='" + hiddenColumnTexts[colIdx] + "' />");
				}
			} catch (e){

            }
        }
    }

    $.fn.dataTable.Buttons.defaults.dom.container.className = 'leftBox';

    new $.fn.dataTable.Buttons( dataTable, {
        buttons: [
            {
                "extend": "colvis",
                "text": "<button type=\"button\">컬럼 설정</button>"
            }
        ]
    } );

    dataTable.buttons().container().prependTo( $(doc.button) );

    //컬럼설정
    var defaultColvisAction = dataTable.button(table.index).action();
    dataTable.button(table.index).action(function (e, dt, button, config) {
        defaultColvisAction(e, dt, button, config);
        if($('.dt-button-collection > .dropdown-menu').length == 0) {
            $('.dt-button-collection')
                .wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
                .find('a').attr('href', '#').wrap("<li />")
        }
        $('.dt-button-collection').prependTo(doc.column);
    });

    dataTable.on( 'column-visibility.dt', function ( e, settings, column, state ) {
        var sTitle = settings.aoColumns[column].sTitle;
        sTitle = sTitle.replace(/(<([^>]+)>)/ig,"");

        if(state){
            $(settings.nTable).css("width",settings.sDestroyWidth);
            $(".hiddenColumn"+column).remove();
            $(".hiddenColumnText"+column).remove();
            if ($("#totalSection").length > 0) {
				$("#totalSection td:eq("+column+")").show();
			}
        } else {
            $("#searchForm").prepend("<input type='hidden' name='hiddenColumn[]' class='hiddenColumn"+column+"' value='"+column+"' />");
            $("#searchForm").prepend("<input type='hidden' name='hiddenColumnText[]' class='hiddenColumnText"+column+"' value='"+sTitle+"' />");
            if ($("#mediaSettingForm").length > 0) {
                $("#mediaSettingForm").prepend("<input type='hidden' name='hiddenColumn[]' class='hiddenColumn"+column+"' value='"+column+"' />");
                $("#mediaSettingForm").prepend("<input type='hidden' name='hiddenColumnText[]' class='hiddenColumnText"+column+"' value='"+sTitle+"' />");
            }
			if ($("#totalSection").length > 0) {
				$("#totalSection td:eq("+column+")").hide();
			}
        }
    });
    table.index = table.index+1;
};


table.copy = function(doc, dataTable, excludeColumns){
    $.fn.dataTable.Buttons.defaults.dom.container.className = 'leftBox';

    new $.fn.dataTable.Buttons( dataTable, {
        buttons: [
            {
                "extend": "copy",
                "text": "<button type=\"button\">복사</button>",
                "exportOptions" : {
                    columns: ':visible',
                    orthogonal: 'export'
                },
                "action": function (e, dt, button, config) {
                	var columnStats = []
                	if (typeof excludeColumns !== "undefined") {
                		for (var colIdx = 0; colIdx < excludeColumns.length; colIdx++) {
                			columnStats.push(dataTable.column(excludeColumns[colIdx]).visible());
                    		dataTable.column(excludeColumns[colIdx]).visible(false);
                		}
                	}
                    $.fn.dataTable.ext.buttons.copyHtml5.action.call(this, e, dt, button, config);
                    alert('복사가 완료 되었습니다.');
                    if(columnStats.length != 0) {
                		for (var colIdx = 0; colIdx < excludeColumns.length; colIdx++) {
                    		dataTable.column(excludeColumns[colIdx]).visible(columnStats[colIdx]);
                		}
                    }
                }
            }
        ]
    } );

    dataTable.buttons().container().prependTo( $(doc) );
    table.index = table.index + 1;
};

table.search = function(doc, dataTable){


    $.fn.dataTable.Buttons.defaults.dom.container.className = 'leftBox';

    var $key = doc.key.replace("#","");

    new $.fn.dataTable.Buttons( dataTable, {
        buttons: [
            {
                "extend": "",
                "text": "<input type=\"text\" id=\""+$key+"\" name=\""+$key+"\" class=\"search\" placeholder=\"검색어를 입력하세요.\" value=\"" + ($.isEmptyObject(doc.value) ? "" : doc.value) + "\">",
                "className": ""
            }
        ]
    } );

    dataTable.buttons().container().prependTo( $(doc.button) );

    $('body').on('keyup', doc.key, function(){
        dataTable.search(this.value).draw();
    });
    table.index = table.index + 1;
};

table.mediaCondition = function(doc, dataTable, data){
	$.fn.dataTable.Buttons.defaults.dom.container.className = 'leftBox';

	new $.fn.dataTable.Buttons( dataTable, {
		buttons: [
			{
				"extend": "",
				"text": "<button type=\"button\" class=\"modalOpen\" data-url=\""+data.url+"\" data-width=\""+data.width+"\" data-hegiht=\""+data.hegiht+"\" data-scroll=\""+data.scroll+"\">조건검색</button>"/*,
				"action": function (e, dt, button, config) {
				}*/
			}
		]
	} );

	dataTable.buttons().container().prependTo( $(doc) );
	table.index = table.index + 1;
};

table.excel = function(doc, dataTable, excludeColumns){
    $("body").on("click", doc.click, function () {
    	var columnStats = [];
    	if (typeof dataTable !== "undefined" && typeof excludeColumns !== "undefined") {
    		for (var colIdx = 0; colIdx < excludeColumns.length; colIdx++) {
    			columnStats.push(dataTable.column(excludeColumns[colIdx]).visible());
        		dataTable.column(excludeColumns[colIdx]).visible(false);
    		}
    	}
        var browser = navigator.userAgent.toLowerCase();
        // ie 구분
        if (-1 != browser.indexOf('trident')) {
            downloadExcelIe(doc.table.replace("#", ""),  ($.isEmptyObject(doc.filename) ? $("#sectionWrap > h2").text() + '_' + $("input[name=sDate]").val() + '_' + $("input[name=eDate]").val() : doc.filename) + '.xls');
        } else {
            var uri = $(doc.table).excelexportjs({
                containerid: doc.table.replace("#", "")
                , datatype: 'table'
                , returnUri: true
            });

            $(this).attr('download', ($.isEmptyObject(doc.filename) ? $("#sectionWrap > h2").text() + '_' + $("input[name=sDate]").val() + '_' + $("input[name=eDate]").val() : doc.filename) + '.xls').attr('href', uri).attr('target', '_blank');
        }
        if(columnStats.length != 0) {
    		for (var colIdx = 0; colIdx < excludeColumns.length; colIdx++) {
        		dataTable.column(excludeColumns[colIdx]).visible(columnStats[colIdx]);
    		}
        }
    });

};


function downloadExcelIe(targetId, SaveFileName) {
    if (document.all.excelExportFrame == null) // 프레임이 없으면 만들자~!
    {
        var excelFrame = document.createElement("iframe");
        excelFrame.id = "excelExportFrame";
        excelFrame.name = "excelExportFrame";
        excelFrame.position = "absolute";
        excelFrame.style.zIndex = -1;
        excelFrame.style.visibility = "hidden";
        excelFrame.style.top = "-10px";
        excelFrame.style.left = "-10px";
        excelFrame.style.height = "0px";
        excelFrame.style.width = "0px";
        document.body.appendChild(excelFrame); // 아이프레임을 현재 문서에 쑤셔넣고..
    }
    var frmTarget = document.all.excelExportFrame.contentWindow.document; // 해당 아이프레임의 문서에 접근

    if (!SaveFileName) {
        SaveFileName = 'test.xls';
    }

    frmTarget.open("text/html", "replace");
    frmTarget.write('<html>');
    frmTarget
        .write('<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=euc-kr"/>\r\n'); // 별로..
    frmTarget.write('<body onload="saveFile();">');
    frmTarget.write(document.getElementById(targetId).outerHTML); // tag를 포함한 데이터를 쑤셔넣고
    frmTarget.write('<script language="javascript">');
    frmTarget
        .write('function saveFile(){document.execCommand("SaveAs", true, "'
            + SaveFileName + '");}');
    frmTarget.write('<\/script>');
    frmTarget.write('</body>');
    frmTarget.write('</html>');
    frmTarget.close();
    //frmTarget.charset="UTF-8"; // 자 코드셋을 원하는걸로 맞추시고..
    frmTarget.charset = "euc-kr";
    frmTarget.focus();

}

function downloadExcelIeNew(targetId){
    if (document.all.fileName == null){
        $("#excelExport").append("<input type='text' name='fileName' hidden>");
    }
    if (document.all.excelStatus == null){
        $("#excelExport").append("<input type='text' name='excelStatus' value='Y' hidden>");
    }
    if (document.all.excelData == null){
        $("#excelExport").append("<textarea name='excelData' style=' visibility:hidden'></textarea>");
    }
    $("input[name=fileName]").prop('value',($.isEmptyObject(document.filename) ? $("#sectionWrap > h2").text() + '_' + $("input[name=sDate]").val() + '_' + $("input[name=eDate]").val() : document.filename) + '.xls');
    $("textarea[name=excelData]").text(document.getElementById(targetId).outerHTML);

    if (document.all.excelExportFrame == null) {
        var excelFrame = document.createElement("iframe");
        excelFrame.id = "excelExportFrame";
        excelFrame.name = "excelExportFrame";
        excelFrame.position = "absolute";
        excelFrame.style.zIndex = -1;
        excelFrame.style.visibility = "hidden";
        document.body.appendChild(excelFrame);
    }
    var frmTarget = document.all.excelExportFrame.contentWindow.document;
    $("#excelExport").attr("action","/down/excel");
    $("#excelExport").attr("target","excelExportFrame");
    $("#excelExport").attr("method","post");
    $("#excelExport").submit();
}

function downloadExcelIeNew2(htmlData){
	if (document.all.fileName == null){
		$("#excelExport").append("<input type='text' name='fileName' hidden>");
	}
	if (document.all.excelStatus == null){
		$("#excelExport").append("<input type='text' name='excelStatus' value='Y' hidden>");
	}
	if (document.all.excelData == null){
		$("#excelExport").append("<textarea name='excelData' style=' visibility:hidden'></textarea>");
	}
	$("input[name=fileName]").prop('value',($.isEmptyObject(document.filename) ? $("#sectionWrap > h2").text() + '_' + $("input[name=sDate]").val() + '_' + $("input[name=eDate]").val() : document.filename) + '.xls');
	$("textarea[name=excelData]").text(htmlData);


	if (document.all.excelExportFrame == null) {
		var excelFrame = document.createElement("iframe");
		excelFrame.id = "excelExportFrame";
		excelFrame.name = "excelExportFrame";
		excelFrame.position = "absolute";
		excelFrame.style.zIndex = -1;
		excelFrame.style.visibility = "hidden";
		document.body.appendChild(excelFrame);
	}
	var frmTarget = document.all.excelExportFrame.contentWindow.document;
	$("#excelExport").attr("action","/down/excel");
	$("#excelExport").attr("target","excelExportFrame");
	$("#excelExport").attr("method","post");
	$("#excelExport").submit();
}


table.summary = function(doc, dataTable){

    $.fn.dataTable.Api.register('sum()', function () {
        return this.flatten().reduce( function (a, b) {
            if ( typeof a === 'string' ) {
                a = a.replace(/(<([^>]+)>)/ig,"").replace(/[^\d.-]/g, '') * 1;
            }

            if ( typeof b === 'string' ) {
                b = b.replace(/(<([^>]+)>)/ig,"").replace(/[^\d.-]/g, '') * 1;
            }
            return a + b;
        }, 0 );
    });

    $.fn.dataTable.Api.register('avg()', function () {
        var data = this.flatten();
	    var sum = data.sum();
        return Math.round(sum / data.length);
    });

    dataTable.on('draw.dt', function () {

        var $index = 0;

        $(doc.section).find('td').each(function(index) {
            if( !dataTable.column(index).visible() ){
                $index++;
            }
        });

        $(doc.section).find('td').each(function(index) {

            index = index+$index;

            if ($(this).hasClass("dataSummary")) {
                $(this).text(dataTable.column(index, {columns: ':visible', page: 'current'}).data().sum().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            } else if ($(this).hasClass("dataAverage")) {
                $(this).text(dataTable.column(index, {page: 'current'}).data().avg().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            } else if ($(this).hasClass("columnAverage")) {
                var first_index = $(this).data("fist-index");
                var second_index = $(this).data("second-index");

                if (typeof $(this).data("product-type") != "undefined" && $(this).data("product-type") == "02") {
                    second_index = $(this).data("second-index2");
                }

  	  	    	var csum = dataTable.column(first_index, {page: 'current'}).data().sum();
  	  	    	var psum = dataTable.column(second_index, {page: 'current'}).data().sum();

                var avg = psum == 0 ? 0 : csum / psum;
                $(this).text(avg.toFixed(Number($(this).data("decimals"))).replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            } else if ($(this).hasClass("dataPercent")) {
                var csum = dataTable.column($(this).data("fist-index"), {page: 'current'}).data().sum();
                var psum = dataTable.column($(this).data("second-index"), {page: 'current'}).data().sum();

                var percent = psum == 0 ? 0 : (csum / psum)*100;
                $(this).text(percent.toFixed(Number($(this).data("decimals"))).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'%');
            }
        });
    });
};
