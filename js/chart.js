//넘버 포멧
function number_format(point){
    var nArr = String(point).split('').join(',').split('');
    for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
    return nArr.join('');
}

//소수점 넘버 포멧
function number_format2(point){
	var numberArr = String(point).split('.');
	var nArr = numberArr[0].split('').join(',').split('');

	for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
	return (point > 0) ? nArr.join('') + (numberArr[1]==null ? '' : '.'+numberArr[1]) : 0;
}

var chartColors = ['#7e88bd', '#aeb8ed', '#afe2db', '#aae0ae', '#bca58d', '#cc79a1', '#a47faa'];

var chart =  {
    line : function(option, category, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        var format = option.data("format") == null ? "" : option.data("format");
        Highcharts.chart(option.attr("id"), {
            chart: { type: 'line' },
            title: { text: option.data('title') },
            subtitle: { text: '' },
            xAxis: { categories: category },
            yAxis: { title: { text: '' } },
            tooltip: {
                headerFormat: '',
                formatter: function () {
                    if(format == 'double'){
                        return this.point.y+unit;
                    }else{
                        return number_format(this.point.y)+unit;
                    }
                }
            },
            legend: { enabled: false },
            series: [{ data: values }]
        });
    } ,
    media_pie : function(option, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        Highcharts.chart(option.attr("id"), {
            chart: { type: 'pie' },
            title: { text: option.data('title') },
            plotOptions: { series: { dataLabels: { enabled: true, format: '{point.name}: {point.y:.1f}%' } } },
            tooltip: { headerFormat: '',  pointFormat: this.point_format(option.data("format")) },
            colors :  chartColors ,
            series: [ { "colorByPoint": true, "data": values } ],
            credits: { enabled: false },
            legend: { enabled: false },
            exporting: { enabled: false }
        });
    },
    exposure_pie : function(option, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        Highcharts.chart(option.attr("id"), {
            chart: { type: 'pie' },
            title: { text: option.data('title') },
            plotOptions: { series: { dataLabels: { enabled: true, formatter : function(){ return this.point.name+' '+this.point.y+'%<br />'+number_format(this.point.j)+unit; } } } },
            tooltip: {enabled : false, headerFormat: '',  pointFormat: this.point_format(option.data("format")) },
            colors : chartColors ,
            series: [ { "colorByPoint": true, "data": values } ],
            credits: { enabled: false },
            legend: { enabled: false },
            exporting: { enabled: false }
        });
    },
    item_pie : function(option, values) {
        var chartColors = ["rgb(133,183,78)", "rgb(175,171,171)"];
        var unit = option.data("unit") == null ? "" : option.data("unit");
        Highcharts.chart(option.attr("id"), {
            chart: {
                type: 'pie'
            },
            title: {
                text: option.data("title")
            },
            colors : chartColors ,
            tooltip: {
                enabled: false,
                pointFormat: '<b>{point.y} %</b>({point.j} 건)'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter : function(){
                            return this.point.name+'<br />'+this.point.y+'%<br />'+number_format(this.point.j)+unit;
                        }/*,
                        distance: -70,
                        style: {
                            textOutline: false,
                            fontSize: '13px'
                        }*/
                    }
                }/*,
                pie: {
                    size: 270
                }*/
            },
            series: [{
                "colorByPoint": true,
                "data": values
            }]
        });
    },
    column : function(option, category, values, colors) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        let color = colors == null ? chartColors : colors;

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        Highcharts.chart(option.attr("id"), {
            //colors: ['#85b74e'],
            colors: color,
            chart: { type: 'column' },
            title: { text: option.data('title') },
            xAxis: { type: 'category', categories: category },
            yAxis: { title: { text: '' } },
            plotOptions: {
                column: { colorByPoint: true },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.,0f}' + unit
                    }
                }
            } ,
            legend: { enabled: false },
            //colors : chartColors ,
            colors : color ,
            tooltip: {
                enabled: false,
                headerFormat: '',
                formatter: function () {
                    return number_format(this.point.y)+unit;
                }
            },
            series: [{colorByPoint: true, data: values }]
        });
    },
    column2 : function(option, category, values, colors, avg,unit) {
       // var unit = option.data("unit") == null ? "" : option.data("unit");
        let color = colors == null ? chartColors : colors;
        //avg =500000;
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        Highcharts.chart(option.attr("id"), {
            //colors: ['#4eb798'],
            colors: color,
            chart: { type: 'column' },
            title: { text: option.data('title') },
            xAxis: { type: 'category', categories: category },

            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                lineWidth: 1,
                gridLineWidth: 0,
                plotLines: [{
                    value: avg,
                    color: 'red',
                    width: 1,
                    label: {
                        //text: 'Theoretical mean: 932',
                        align: 'center',
                        style: {
                            color: 'gray'
                        }
                    },
                    zIndex:10000
                }]
            },

           // yAxis: { title: { text: '' } },
            plotOptions: {
                column: { colorByPoint: true },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.,0f}' + unit
                    }
                }
            } ,
            legend: { enabled: false },
            //colors : chartColors ,
            colors : color ,
            tooltip: {
                enabled: true,
                headerFormat: '',
                formatter: function () {
                    //console.log(this.point);
                    return this.point.category+'<br> '+number_format2(this.point.y)+unit;
                    //return number_format(this.point.y)+unit;
                }
            },
            series: [{colorByPoint: true, data: values }]
        });
    },
    pcate_column : function(option, category, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        var format = option.data("format") == null ? "" : option.data("format");
        Highcharts.chart(option.attr("id"), {
            colors: ['#85b74e'],
            chart: { type: 'column' },
            title: { text: option.data('title') },
            xAxis: { type: 'category', categories: category },
            yAxis: { title: { text: '' } },
            legend: { enabled: false },
            tooltip: { headerFormat: '',
                formatter: function () {
                    if(format == "double"){
                        return this.point.y+unit;
                    }else{
                        return number_format(this.point.y)+unit;
                    }
                }
            },
            series: [{colorByPoint: true, data: values }]
         });
    },
    multi_column : function(option, category, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        Highcharts.chart(option.attr("id"), {
            chart: { type: 'column' },
            title: { text: option.data('title') },
            xAxis: { categories: category},
            yAxis: { allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: { headerFormat: '',
                formatter: function () {
                    return this.point.series.name+' : '+number_format(this.point.y)+unit;
                }
            },
            series: values
        });
    },
    time_chart : function(option, category, values, avg, chartOpt1, chartOpt2, chartOpt3, chartOpt4, chartOpt5, max, max2) {
    	//console.log(chartOpt3);
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});

        Highcharts.chart(option.attr("id"), {
            chart: { type: 'column' },
            title: { text: option.data('title') },

			annotations: [{
				labelOptions: {
					backgroundColor: 'rgba(255,255,255,0.5)',
					verticalAlign: 'top',
					y: 5
				},
				labels: [{
					point: {
						xAxis: 0,
						yAxis: 0,
						x: 8,
						y: 480
					},
					text: 'Arbois'
				}]
			}],
            xAxis: {
            	type: 'category',
				crosshair: true
			},
            yAxis: [{
				// Secondary yAxis
            	allowDecimals: false,
                min: 0,
                max: max,
                title: {
                    text: chartOpt1.title
                },
				labels: {
					format: '{value:.,0f} '
				}
            }, {
				// Secondary yAxis
				title: {
					text: chartOpt2.title,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value:.,0f} '+'%'
				},
				opposite: true,
				plotLines: [{
					value: avg,
					color: chartOpt2.color,
					width: 1,
					label: {
						text: '평균 ' + chartOpt2.title + '<br>' + avg + chartOpt2.unit,
                        align: 'left',
                        y: -50,
                        //top: '0px';
						style: {
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '15px',
						}
					},
					zIndex:8,
					dashStyle: 'shortdash'
				}],
                max: max2
			}, {
				// Secondary yAxis
				title: {
					text: null,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value:.,0f} '+'%'
                },
				opposite: true
			},{
				// Secondary yAxis
				title: {
					text: null,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value:.,0f} '+'%'
				},
				opposite: true
			},{
				// Secondary yAxis
				title: {
					text: null,
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value:.,0f} '+'%'
				},
				opposite: true
			}],
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y}</b> {point.unit}<br/>{point.convCntData}',
				shared: true
			},
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: values
        });
    },
    stacked_column : function(option, category, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        Highcharts.chart(option.attr("id"), {
            chart: { type: 'column' },
            title: { text: option.data('title') },
            xAxis: { categories: category },
            yAxis: {
                min: 0,
                    title: {
                    text: ''
                },
                stackLabels: {
                    enabled: false,
                        style: {
                        fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            /*legend: {
                align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
            },*/
            tooltip: {
                /*headerFormat: '',
                formatter: function () {
                    return number_format(this.point.y)+unit;
                }*/
                pointFormat: '{series.name}: <b>{point.y}'+unit+'</b><br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                        dataLabels: {
                        enabled: false
                    }
                }
            },
            series: values
        });
    },
    bar : function(option, category, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        unit ='%';
        Highcharts.chart(option.attr("id"), {
            //chart: { type: 'bar', height:'100%' },
            chart: { type: 'bar', height:'350 px' },
            title: { text: option.data('title') },
            xAxis: { type: 'category' , categories: category  },
            yAxis: { title: { text: '' },labels:{enabled:false} },
            legend: { enabled: false },
            colors : chartColors ,
            tooltip: {
                enabled: false,
                headerFormat: '',
                formatter: function () {
                    if(unit == '%') {
                        return this.point.y+" %";
                    }else{
                        return number_format(this.point.y) + unit;
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            if(unit == '%') {
                                return this.point.y+" %";
                            }else{
                                return number_format(this.point.y) + unit;
                            }
                        }
                    }
                }
            },
            series: [{colorByPoint: true, data: values }]
         });
    },
    point_format : function(text_type){
        if(text_type == "media_category") {
            return '총소진금액: <b><span style="color:red">{point.z}</span></b>원<br>총매출금액: <b>{point.d}</b>원<br>컨버젼: <b>{point.j}</b>%<br>{point.name}: <b>{point.y}</b> %';
        } else if(text_type == "media_platform"){
            return '총소진금액: <b><span style="color:red">{point.z}</span></b>원<br>총매출금액: <b>{point.d}</b>원<br>{point.name}: <b>{point.y:1f}</b> %';
        } else if(text_type == "keyword_conv"){
            return '<b>{point.name}</b><br>전환수: <b>{point.z}</b>건<br>비율: <b>{point.y:1f}</b> %';
        } else {
            return '';
        }
    },
    product_chart : function(option, category, values, avg) {
        var color1 = Highcharts.getOptions().colors[1];
        var color2 = Highcharts.getOptions().colors[1];
        var color3 = Highcharts.getOptions().colors[1];

        if (typeof values[0] != "undefined") {
            color1 = values[0].color;
        }

        if (typeof values[1] != "undefined") {
            color2 = values[1].color;
        }

        if (typeof values[2] != "undefined") {
            color3 = values[2].color;
        }

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        Highcharts.chart(option.attr("id"), {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: option.data('title')
            },
            xAxis: [{
                categories: category,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value:,.0f}',
                    style: {
                        color: color1
    }
                },
                title: {
                    text: null
                },
				plotLines: [{
					value: avg,
					color: '#ff2c2c',
					width: 1,
					label: {
						text: '총 ROAS 평균 : ' + avg,
						align: 'left',
						y: -50,
						style: {
							color: '#ff2c2c',
							fontWeight: 'bold',
							fontSize: '15px',
                }
					},
					zIndex:10,
					dashStyle: 'shortdash',
				}],
            }, { // Secondary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value:,.0f}',
                    style: {
                        color: color2
                    }
                },
                opposite: true,
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: null
                },
                labels: {
                    format: '{value:,.0f}',
                    style: {
                        color: color3
                    }
                },
                opposite: true,
            }],
            tooltip: {
				pointFormat: '{series.name}: <b>{point.y}</b> {point.unit}<br/>{point.convCntData}',
                shared: true
            },
            series: values
        });
    },
	insite_view_stackcolumn : function(option, category, values) {
		var color1 = Highcharts.getOptions().colors[1];
		var color2 = Highcharts.getOptions().colors[1];
		var color3 = Highcharts.getOptions().colors[1];

		if (typeof values[0] != "undefined") {
			color1 = values[0].color;
		}

		if (typeof values[1] != "undefined") {
			color2 = values[1].color;
		}

		if (typeof values[2] != "undefined") {
			color3 = values[2].color;
		}

		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});

		Highcharts.chart(option.attr("id"), {
			chart: {
				type: 'column'
			},
			title: {
				text: '총매출 TOP 10 통계'
			},
			xAxis: {
				categories: category
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: ( // theme
							Highcharts.defaultOptions.title.style &&
							Highcharts.defaultOptions.title.style.color
						) || 'gray'
					}
				}
			},
			/*legend: {
				align: 'right',
				x: -30,
				verticalAlign: 'bottom',
				y: 25,
				floating: true,
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},*/
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>'//Total: {point.stackTotal}
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true
					}
				}
			},
			series: values
		});
	},
    main_static_chart : function(option, category, values, chartOpt1, chartOpt2) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        Highcharts.chart(option.attr("id"), {
            chart: { type: 'column' },
            title: { text: option.data('title') },

            annotations: [{
                labelOptions: {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    verticalAlign: 'top',
                    y: 5
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 8,
                        y: 480
                    },
                    text: 'Arbois'
                }]
            }],
            xAxis: {
                type: 'category',
                crosshair: true
            },
            yAxis: [{
                // Secondary yAxis
                allowDecimals: false,
                min: 0,
                title: {
                    text: chartOpt1.title
                },
                labels: {
                    format: '{value:.,0f} '
                }
            }, {
                // Secondary yAxis
                title: {
                    text: null,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value:.,0f} '+'%'
                },
                opposite: true
            }],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b> {point.unit}<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: values
        });
    },
    user_pie : function(option, values) {
        var unit = option.data("unit") == null ? "" : option.data("unit");
        chartColors = ['#173f5f', '#00AAA0', '#ED553B', '#8389E0', '#22B14C', '#FFB85F', '#0070C0'];

        Highcharts.chart(option.attr("id"), {
            chart: { type: 'pie' },
            title: { text: '<b>'+option.data('title')+'</b>' },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter : function(){
                            return this.point.name+' '+number_format2(this.point.y)+unit;
                        }
                    }
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    innerSize: 150,
                    size: 300
                }
            },
            tooltip: { headerFormat: '',  pointFormat: '{point.name}: <b>{point.y:.1f}%</b> {point.unit}<br/>' },
            colors :  chartColors ,
            series: [ { "colorByPoint": true, "data": values } ],
            credits: { enabled: false },
            legend: { enabled: false },
            exporting: { enabled: false }
        });
    },

};
