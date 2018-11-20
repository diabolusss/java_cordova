/* JS функции для сервисов APPs */
/* Плагин ограничения числа символов в элементе */
(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                set_count(this, elem);
            });
            function set_count(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html(limit - chars + " из " + limit);
            }
            set_count($(this)[0], elem);
        }
    });
})(jQuery);
/* Общие функции */
jQuery(document).ready(function($) {
	// Отправка формы по сочетанию клавиш ctrl+enter
	$(document).keypress(function(e){
		if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
			$('.app_form').submit();
		}
	});
	// Копирование в буфер обмена
	function copy2clipboard(containerid) {
		if (document.selection) {
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand("Copy"); 
		} else if(window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().addRange(range);
			document.execCommand("Copy");
		}
	}
	$('.copy_btn').click(function() {
		copy2clipboard($(this).parent().next('.app_alert').attr('id'));
		return false;
	});
	// Случайное целое число
	function get_rm_int(min, max) {  // использование Math.round() даст неравномерное распределение!  
		return Math.floor(Math.random() * (max - min + 1)) + min;  
	};
	// Перемешать элементы массива в случайном порядке
	function shuffle($arr) {
		function compareRandom(a, b) {
			return Math.random() - 0.5;
		}
		return $arr.sort(compareRandom);
	}
	// Поиск в массиве: на пустом массиве проверяем поддерживается ли indexOf, далее определяем функцию поиска значения в массиве
	if ([].indexOf) {
		var findInArr = function(array, value) {
			return array.indexOf(value);
		}
	} else {
		var findInArr = function(array, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === value)
					return i;
			}
			return -1;
		}
	}
	// Поиск в строке: на пустом массиве проверяем поддерживается ли indexOf, далее определяем функцию поиска значения в строке
	if ([].indexOf) {
		var findInStr = function(str, value, start) {
			return str.indexOf(value, start);
		}
	} else {
		var findInStr = function(str, value, start) {
			for (var i = start; i < str.length; i++) {
				if (str[i] === value)
					return i;
			}
			return -1;
		}
	}
	
/* Online переключение раскладки */

	function to_rus(str_lat_err) {
		var lat_str = "Q-W-E-R-T-Y-U-I-O-P-A-S-D-F-G-H-J-K-L-Z-X-C-V-B-N-M";
		var rus_str = "Й-Ц-У-К-Е-Н-Г-Ш-Щ-З-Ф-Ы-В-А-П-Р-О-Л-Д-Я-Ч-С-М-И-Т-Ь";
		var lat_str_exp_1 = (lat_str + "-" + lat_str.toLowerCase()+"-:-\\^-~-`-\\{-\\[-\\}-\\]-\"-'-<-,->-\\.-;-\\?-\\/-&-@-#-\\$").split("-");
		var rus_str_exp_1 = (rus_str + "-" + rus_str.toLowerCase()+"-Ж-:-Ё-ё-Х-х-Ъ-ъ-Э-э-Б-б-Ю-ю-ж-,-.-?-\"-№-;").split("-");
		var lat_str_exp_1_len = lat_str_exp_1.length;
		for(i=0; i<lat_str_exp_1_len; i++) {
			str_lat_err = str_lat_err.replace(new RegExp(lat_str_exp_1[i],'g'), rus_str_exp_1[i]);
			//sN=sN.replace(new RegExp("Ъ",'g'),"ъ");
			//sN=sN.replace(new RegExp ("Ь",'g'),"ь");
		}
		return str_lat_err;
	}
		
	function to_lat(str_rus_err) {
		var lat_str = "Q-W-E-R-T-Y-U-I-O-P-A-S-D-F-G-H-J-K-L-Z-X-C-V-B-N-M";
		var rus_str = "Й-Ц-У-К-Е-Н-Г-Ш-Щ-З-Ф-Ы-В-А-П-Р-О-Л-Д-Я-Ч-С-М-И-Т-Ь";
		var lat_str_exp_2 = (lat_str + "-" + lat_str.toLowerCase()+"-^-:-$-@-&-~-`-{-[-}-]-\"-'-<->-;-?-\/-.-,-#").split("-");
		var rus_str_exp_2 = (rus_str + "-" + rus_str.toLowerCase()+"-:-Ж-;-\"-\\?-Ё-ё-Х-х-Ъ-ъ-Э-э-Б-Ю-ж-,-\\.-ю-б-№").split("-");
		rus_str_exp_2_len = rus_str_exp_2.length;
		for(i=0; i<rus_str_exp_2_len; i++) {
			str_rus_err = str_rus_err.replace(new RegExp(rus_str_exp_2[i],'g'), lat_str_exp_2[i]);
		}
		return str_rus_err;
	}
	
	$('#enru_form_torus').click(function() {
		$('#rus_err_text').val(to_rus($('#lat_err_text').val()));
		return false;
	});
	
	$('#enru_form_tolat').click(function() {
		$('#lat_err_text').val(to_lat($('#rus_err_text').val()));
		return false;
	});
	
/* Переводчик кириллица - транслит */

	function ru2tr(ru_text, type) {
		var ru_str = '';
		var lat_str = '';
		switch(type) {
			case 'gost':
				ru_str = "Ё_Ж_Ц_Щ_Ч_Ш_Ъ_Ь_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ы";
				lat_str = "E_Zh_Ts_Shch_Ch_Sh_Ie__E_Iu_Ia_A_B_V_G_D_E_Z_I_I_K_L_M_N_O_P_R_S_T_U_F_Kh_Y";
				break;
			case 'poisk_url':
				ru_str = "Ё_Ж_Ц_Щ_Ч_Ш_Ъ_Ь_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ы_\\s_\\+_--";
				lat_str = "yo_zh_c_sch_ch_sh___ye_yu_ya_a_b_v_g_d_e_z_i_y_k_l_m_n_o_p_r_s_t_u_f_h_y_-_-plus_-";
				break;
			case 'reader':
				ru_str = "Ё_Ж_Ц_Щ_Ч_Ш_Ъ_Ь_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ы";
				lat_str = "Jo_Zh_Ts_Sch_Ch_Sh_\"_\'_`E_Ju_Ja_A_B_V_G_D_E_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_H_Y";
				break;
			default: 
				ru_str = "Ё_Ж_Ц_Щ_Ч_Ш_Ъ_Ь_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ы";
				lat_str = "Jo_Zh_Ts_Sch_Ch_Sh_\"_\'_`E_Ju_Ja_A_B_V_G_D_E_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_H_Y";
		}
		ru_str = (ru_str + "_" + ru_str.toLowerCase()).split("_");
		lat_str =(lat_str + "_" + lat_str.toLowerCase()).split("_");
		ru_str_len = ru_str.length;
		tr_text = ru_text;
		for(i=0; i<ru_str_len; i++) {
			tr_text = tr_text.replace(new RegExp(ru_str[i], 'g'), lat_str[i]);
		}
		if(type == 'poisk_url')
			tr_text = tr_text.replace(new RegExp("[\\[|\\]|\\{|\\}|\\\"|\\'|%|\\^|\\$|~|!|\\?|\\*|№|,|\\.]", 'g'), '');
		return tr_text;
	}
	
	function tr2ru(tr_text) {
		var ru_str = "Ё_Ж_Ц_Щ_Ч_Ш_Ъ_Ь_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ы";
		var lat_str = "Jo_Zh_Ts_Sch_Ch_Sh_\"_\'_`E_Ju_Ja_A_B_V_G_D_E_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_H_Y";
		ru_str = (ru_str + "_" + ru_str.toLowerCase()).split("_");
		lat_str =(lat_str + "_" + lat_str.toLowerCase()).split("_");
		ru_str_len = ru_str.length;
		ru_text = tr_text;
		for(i=0; i<ru_str_len; i++)
			ru_text = ru_text.replace(new RegExp(lat_str[i], 'g'), ru_str[i]);
		ru_text = ru_text.replace(new RegExp("Ъ", 'g'), "ъ");
		ru_text = ru_text.replace(new RegExp ("Ь", 'g'), "ь");
		return ru_text;
	};
	
	$('#tr_form_tolat').click(function() {
		tr_type = $('#tr_type').val();
		$('#lat_tr_text').val(ru2tr($('#rus_tr_text').val(), tr_type));
		return false;
	});
	
	$('#tr_form_torus').click(function() {
		$('#rus_tr_text').val(tr2ru($('#lat_tr_text').val()));
		return false;
	});
	
/* Анализ параметров текста */
	
	function text_info(text_str, find_text) {
		find_text = (typeof find_text !== 'undefined') ? find_text : '';
		var params = [0, 0, 0, 0, 0];
		if(text_str != "") {
			params[0] = text_str.length;
			buffer = text_str.match(/[\r\n]/gim);
			if(typeof(buffer) == "object" && buffer != null)
				params[0] = params[0] - buffer.length;
			params[1] = params[0];
			buffer = text_str.match(/\S/gim);
			if(typeof(buffer) == "object" && buffer != null)
				params[1] = buffer.length;
			buffer = text_str.match(/[!\.\?](\s|$)/gim);
			if(typeof(buffer) == "object" && buffer != null)
				params[2] = typeof(buffer.length) == "number"?buffer.length:0;
			buffer = text_str.match(/\s+[^\f\r\n]/gim);
			if(typeof(buffer) == "object" && buffer != null) 
				params[3] = typeof(buffer.length) == "number"?buffer.length+1:0;
			if(find_text != "") {
				reg = new RegExp(find_text, 'gim')
				buffer = text_str.match(reg);
				if(typeof(buffer) == "object" && buffer != null)
				params[4] = buffer.length;
			};
		};
		var info_str = "<div>Знаков(с пробелами): " + params[0] + "<br />";
		info_str += "Знаков(без пробелов): " + params[1] + "<br />";
		info_str += "Предложений: " + params[2] + "<br />";
		info_str += "Слов: " + params[3] + "<br />";
		info_str += "Найдено вхождений: " + params[4] + "</div>";
		return info_str;
	};
	
	function text_info_stems(text_str) {
		var regexp_str = '([\\.,!\\?:;]*\\s+)|([\\.,!\\?:;]+$)';
		var regexp = new RegExp(regexp_str, 'gm');
		text_str = text_str.replace(regexp, ' ');
		text_str = text_str.replace(new RegExp('^\\s+|\\s+$', 'g'), '');
		text_str.toLowerCase();
		var words_list = text_str.split(' ');
		var stemmer = new PorterStemRu();
		stemmer.Stem_Caching = 1; // 0|1 вкл/выкл кэш
		var word_stemms = {};
		words_list.map(function(word) {
			var word_stem = stemmer.stem_word(word);
			if(!word_stemms[word_stem]) {
				word_stemms[word_stem] = {'count': 0, 'words': {}};
			}
			if(!word_stemms[word_stem]['words'][word]) {
				word_stemms[word_stem]['words'][word] = 0;
			}
			word_stemms[word_stem]['words'][word]++;
			word_stemms[word_stem].count++;
		});
		stemmer.clear_stem_cache(); // Чистим кэш
		// Сортируем массив ключей объекта стеммов по количеству соответствующих слов
		var stemm_key_arr = [];
		for(var key_stemm in word_stemms) {
			stemm_key_arr.push({'name': key_stemm, 'count': word_stemms[key_stemm].count})
		}
		function compareCountDesc(stemmA, stemmB) {
			return stemmB.count - stemmA.count;
		}
		stemm_key_arr.sort(compareCountDesc);
		var stems_str = '';
		var stemms_count = stemm_key_arr.length;
		var words_str = '';
		stemm_key_arr.forEach(function(stemm, i, arr) {
			words_str = '';
			for(var  key_word in word_stemms[stemm.name]['words']) {
				words_str += '<span>' + key_word + ': ' + word_stemms[stemm.name]['words'][key_word] + '</span>';
			}
			stems_str += '<div class=\"stemm_row\"><span class=\"stemm_col_2_1\">' + stemm.name + ': ' + word_stemms[stemm.name].count + '</span><span class=\"stemm_col_2_2\">' + words_str + '</span></div>';
		});
		stems_str = '<div class=\"stemm_row stemm_row_title\"><span class=\"stemm_col_2_1\">Стэммы (' + stemms_count + ')</span><span class=\"stemm_col_2_2\">Слова (' + words_list.length + ')</span></div>' + stems_str;
		return stems_str;
	}
	
	$('#atext_form_run').click(function() {
		$('#atext_form_run').trigger('submit');
		return false;
	});
	
	$('#atext_form').submit(function() {
		var text_str = $('#atext').val();
		var find_text = $('#atext_regexp').val();
		$('.app_alert_title').html("Стемминг и анализ текста");
		$('.app_alert').html('<div class=\"app_alert_subtitle\">Длина текста в символах, словах или предложениях</div>' + text_info(text_str, find_text));
		$('.app_alert').html($('.app_alert').html() + '<div class=\"app_alert_subtitle\">Стемминг и статистика по словам</div>' + text_info_stems(text_str));
		return false;
	});
	
	$('#atext').on("keyup blur", function() {
		var text_str = $('#atext').val();
		var find_text = $('#atext_regexp').val();
		$('.app_alert_title').html("Стемминг и анализ текста");
		$('.app_alert').html('<div class=\"app_alert_subtitle\">Длина текста в символах, словах или предложениях</div>' + text_info(text_str, find_text));
		$('.app_alert').html($('.app_alert').html() + '<div class=\"app_alert_subtitle\">Стемминг (выделение основы слов) и статистика по словам</div>' + text_info_stems(text_str));
	});

/* Online парсинг ссылок из XML sitemap или email адресов */

	function uniq_arr(arr, i_name) {
		i_name = (typeof i_name !== 'undefined') ? i_name : '';
		var arr_obj = {};
		for(var i=0, len=arr.length; i < len; i++) {
			if(i_name != '') {
				arr_obj[arr[i][i_name]] = arr[i];
			} else {
				arr_obj[arr[i]] = arr[i];
			}
		}
		arr = new Array();
		for(var key in arr_obj)
			arr.push(arr_obj[key]);
		return arr;
	}
// Фильтр e-mail по списку стоп слов
	function stoplist_filter(arr, sl_arr) {
		var lower_str = '';
		var is_flag = 0;
		var res_arr = [];
		if(sl_arr.length) {
			if(sl_arr[0] != "") {
				res_arr = arr.filter(function(item_arr, i, arr) {
					lower_str = item_arr.toLowerCase();
					sl_arr.forEach(function(item_stop, i, arr) {
						if(lower_str == item_stop.toLowerCase()) {
							is_flag = 1;
						}
					});
					if(is_flag == 0) {
						return true;
					} else {
						is_flag = 0;
						return false;
					}
				});
			} else {
				return arr;
			}
		}else {
			return arr;
		}
		return res_arr;
	}
	
	function js_parser(parser_text, regexp, regexp_param) {
		regexp = new RegExp(regexp, regexp_param);
		//var parser_result = parser_text.match(regexp);
		var parser_buffer = [];
		var parser_result = [];
		var i = 0;
		while ((parser_buffer = regexp.exec(parser_text)) != null) {
			parser_result[i++] = parser_buffer[1];
		}
		return parser_result;
	}
	
	$('#js_parser_type').change(function() {
		$('#js_parser_regexp').val($('#js_parser_type').val());
	});
	
	$('#js_parser_form_run').click(function() {
		$('#js_parser_form').trigger('submit');
		return false;
	});
	
	$('#js_parser_form').submit(function() {
		var js_parser_regexp = $('#js_parser_regexp').val();
		var js_parser_regexp_param = $('#js_parser_regexp_param').val();
		var js_parser_uniq = $('#js_parser_uniq').is(':checked') ? 1 : 0;
		var js_parser_sep = $('#js_parser_sep').val();
		var js_parser_septext = "";
		switch(js_parser_sep) {
			case 'new_row':
				js_parser_septext = "<br />\n";
				break;
			case 'comma':
				js_parser_septext = ", ";
				break;
			case 'semicolon':
				js_parser_septext = "; ";
				break;
			case 'space':
				js_parser_septext = " ";
				break;
			default:
				js_parser_septext = "<br />\n";
				break;
		}
		var regexp = new RegExp('\\s*,\\s*', 'gi');
		var js_parser_stoplist = $('#js_parser_stoplist').val();
		js_parser_stoplist = js_parser_stoplist.split(regexp);
		js_parser_stoplist = uniq_arr(js_parser_stoplist);
		var js_parser_aarr = {};
		var js_parser_str = '';
		var js_parser_count = 0;
		var js_parser_result = [];
		$('#js_parser_status').html('');
		$('.app_alert_title').html('');
		$('.app_alert').html('');
		var js_parser_source = $('#js_parser_source').val();
		$('#js_parser_form .btn_submit').addClass('run');
		if(js_parser_source == 'urls_list') {
			var urls = $('#js_parser_urls').val().split('\n');
			len_max = Math.min(urls.length, 100);
			if(urls) {
				for(var i=0; i < len_max; i++) {
					var page_url = urls[i];
					if(page_url != '') {
						$('#js_parser_status').html(' | ' + (i+1) + '-я ссылка');
						$.ajax({
							type: "POST",
							url:  $(this).attr('action'),
							dataType: 'json',
							data: {"page_url":page_url},
							success: function(msg) {
								if(!msg.errors && msg.code == 200) {
									js_parser_aarr = js_parser(msg.html, js_parser_regexp, js_parser_regexp_param);
									js_parser_result = js_parser_result.concat(js_parser_aarr);
									if(js_parser_uniq == 1) {
										js_parser_result = uniq_arr(js_parser_result);
									}
									js_parser_result = stoplist_filter(js_parser_result, js_parser_stoplist);
									js_parser_count = js_parser_result.length;
									js_parser_str = js_parser_result.join(js_parser_septext);
									$('.app_alert_title').html("Результаты парсинга (" + js_parser_count + ")");
									$('.app_alert').html(js_parser_str);
								} else {
									$('#js_parser_status').html(' | <span class="red">Ошибка загрузки данных сайта! [' + (msg.code ? msg.code : 0) + ']</span>');
								}
							}					   
						});					
					} else {
						$('#js_parser_status').html(' | <span class="red">Пустая строчка, без URL адреса!</span>');
					}
				}
			} else {
				$('#js_parser_status').html(' | <span class="red">Укажите ссылку на страницу!</span>');
			}
		} else if(js_parser_source == 'text_info') {
			var text_info = $('#js_parser_urls').val();
			if(text_info) {
				js_parser_aarr = js_parser(text_info, js_parser_regexp, js_parser_regexp_param);
				js_parser_result = js_parser_result.concat(js_parser_aarr);
				if(js_parser_uniq == 1) {
					js_parser_result = uniq_arr(js_parser_result);
				}
				js_parser_result = stoplist_filter(js_parser_result, js_parser_stoplist);
				$('#js_parser_status').html(' | Готово!');
				js_parser_count = js_parser_result.length;
				js_parser_str = js_parser_result.join(js_parser_septext);
				$('.app_alert_title').html("Результаты парсинга (" + js_parser_count + ")");
				$('.app_alert').html(js_parser_str);
			} else {
				$('#js_parser_status').html(' | <span class="red">Укажите исходный текст!</span>');
			}
		}
		$('#js_parser_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Размножение и уникализация текстов */

	$('.test_btn').click(function() {
		$('#rm_text_data').val($('#rm_text_test').html());
		return false;
	});
	
	$('.rm_text_tools_btn').click(function() {
		var ta_el = $('#rm_text_data');
        var ta_value =ta_el.val();
        var selection = [ta_el.prop('selectionStart'), ta_el.prop('selectionEnd')];
        ta_value = ta_value.substring(0, selection[0]) + $(this).data('text') + ta_value.substring(selection[1]);
        ta_el.val(ta_value).focus();
        ta_el.prop('selectionStart', selection[0]  + 1);
		ta_el.prop('selectionEnd', selection[0] + 1);
		return false;
	});
	
	$('#rm_text_form_run').click(function() {
		$('#rm_text_form').trigger('submit');
		return false;
	});
	
	$('#rm_text_form').submit(function() {
		$('#rm_text_form .btn_submit').addClass('run');
		var text_data = $('#rm_text_data').val();
		text_data = text_data.replace(new RegExp('\n', 'g'), '<br />');
		var rm_text_random = $('#rm_text_random').is(':checked') ? true : false;
		var rm_text_r100 = $('#rm_text_r100').is(':checked') ? true : false;
		var rm_text_num = $('#rm_text_num').val();
		if(text_data) {
			// Должна быть подключена библиотека рандомизатора
			var rm_text = new TextRandomizator(text_data);
			var rm_text_count = rm_text.num_variant();
			if(rm_text_r100) {
				rm_text_random = true;
				rm_text_num = 100;
			}
			var rm_text_view_count = rm_text_count > rm_text_num ? rm_text_num : rm_text_count;
			$('.app_alert_title').html('Показано результатов: ' + rm_text_view_count + ' из ' + rm_text_count);
			$('.app_alert').html('');
			for(var i = 1; i <= rm_text_view_count; i++) {
				$('.app_alert').html($('.app_alert').html() + '<span>' + rm_text.get_text(rm_text_random) + '<br /></span>');
			}
		} else {
			$('#rm_text_data').val('Введите текст шаблона для обработки!');
		}
		$('#rm_text_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Генерация случайных чисел */

// Поиск элемента в массиве
// Создаем пустой массив и проверяем поддерживается ли indexOf
	if ([].indexOf) {
	  var find_arr = function(array, value) {
		return array.indexOf(value);
	  }
	} else {
	  var find_arr = function(array, value) {
		for (var i = 0; i < array.length; i++) {
		  if (array[i] === value) return i;
		}
		return -1;
	  }
	}

	$('#rm_nums_form_run').click(function() {
		$('#rm_nums_form').trigger('submit');
		return false;
	});
	
	$('#rm_nums_form').submit(function() {
		$('#rm_nums_form .btn_submit').addClass('run');
		var rm_nums_count = +$('#rm_nums_count').val()
		var rm_nums_min = +$('#rm_nums_min').val();
		var rm_nums_max = +$('#rm_nums_max').val();
		var rm_nums_sep = $('#rm_nums_sep').val();
		var rm_nums_uniq = $('#rm_nums_uniq').is(':checked') ? true : false;
		var rm_nums_arr = [];
		var rm_num = 0;
		$('.app_console').html('<span class=\"nums_block\"></span>');
		for(var i = 1; i <= rm_nums_count; i++) {
			rm_num = get_rm_int(rm_nums_min, rm_nums_max);
			if(rm_nums_uniq) {
				if(find_arr(rm_nums_arr, rm_num) == -1) {
					rm_nums_arr.push(rm_num);
					if(i == rm_nums_count) {
						$('.app_console .nums_block').html($('.app_console .nums_block').html() + '<span>' + rm_num + '</span>');
					} else {
						$('.app_console .nums_block').html($('.app_console .nums_block').html() + '<span>' + rm_num + rm_nums_sep + '</span>');
					}
				} else if(i > 1) {
					i--;
				}
			} else {
				rm_nums_arr.push(rm_num);
				if(i == rm_nums_count) {
					$('.app_console .nums_block').html($('.app_console .nums_block').html() + '<span>' + rm_num + '</span>');
				} else {
					$('.app_console .nums_block').html($('.app_console .nums_block').html() + '<span>' + rm_num + rm_nums_sep + '</span>');
				}
			}
		}
		var gen_date = new Date();
		var options = {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					weekday: 'long',
					timezone: 'UTC',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				};
		gen_date = gen_date.toLocaleString("ru", options);
		$('.app_alert').html('<span>Дата и время генерации: </span><span>' + gen_date + '</span>');
		$('#rm_nums_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#rm_nums_form_run').trigger('click');
	
/* Генерация случайных чисел ВК */

// Получание данных с помощью API VK
	function get_win_vk(posts_id, data_type, rm_nums_vk_count) {
		// Инициализация VK API	
		VK.init({
			apiId: 5639527
		}); 
		$('.app_alert').html('<p class="green">Загрузка данных ... </p>');
		$('.app_console').html('<p class="green">Загрузка данных ... </p>');
		// Выбираем пост по части адреса
		VK.Api.call('wall.getById', {posts: posts_id, v: '5.8'}, function(post) {
			if(post.response[0]) {
				var vk_owner_id = post.response[0].from_id;
				var vk_post_id = post.response[0].id;
				var vk_post_type = post.response[0].post_type;
				var vk_post_items = 0;
				var vk_api_method = 'wall.getReposts';
				switch(data_type) {
					case 'vk_reposts':
						vk_api_method = 'wall.getReposts';
						vk_post_items = post.response[0].reposts.count;
						break;
					case 'vk_comments':
						vk_api_method = 'wall.getComments';
						vk_post_items = post.response[0].comments.count;
						break;
					case 'vk_likes':
						vk_api_method = 'likes.getList';
						vk_post_items = post.response[0].likes.count;
						break;
				}
				var rm_nums_vk_max = 0;
				var win_nums =[];
				var win_users = [];
				var get_users_vk = function() {
					VK.Api.call(vk_api_method, {owner_id: vk_owner_id, post_id: vk_post_id, item_id: vk_post_id, type: vk_post_type, count: 1000, offset: rm_nums_vk_max, v: '5.8'}, function(data) {
						if(data.response) {
							if(vk_api_method == 'wall.getReposts') {
								rm_nums_vk_max += data.response.items.length;
							} else if(vk_api_method == 'wall.getComments') {
								rm_nums_vk_max += data.response.items.length;
							} else if(vk_api_method == 'likes.getList') {
								rm_nums_vk_max += data.response.items.length;
							}	
							if(rm_nums_vk_max < vk_post_items && vk_post_items > 0  && rm_nums_vk_max > 0) {
								get_users_vk();
							} else {
								if(rm_nums_vk_max > 0) {
									$('#rm_nums_vk_info').html('Участников: <span>' + rm_nums_vk_max + '</span>');
									var rm_num = 0;
									var win_user_id = 0;
									var k_max = 5000; // ограничение на количество циклов, если действия не от пользователей или участников очень мало по сравнению с количеством победителей.
									for(var i = 0, j = 0; i < rm_nums_vk_count; i++) {
										rm_num = get_rm_int(1, rm_nums_vk_max);
										if(find_arr(win_nums, rm_num) == -1) {
											if(vk_api_method == 'wall.getReposts') {
												win_user_id = data.response.items[rm_num-1].from_id;
											} else if(vk_api_method == 'wall.getComments') {
												win_user_id = data.response.items[rm_num-1].from_id;
											} else if(vk_api_method == 'likes.getList') {
												win_user_id = data.response.items[rm_num-1];
											}
											if(win_user_id > 0)	{			
												win_nums.push(rm_num);	
												win_users.push(win_user_id);
											} else {
												--i;
											}
										} else if(i >= 1 && rm_nums_vk_count < rm_nums_vk_max) {
											--i;
										}
										j++;
										if(j > k_max) break;
									}
									VK.Api.call('users.get', {user_ids: win_users, fields: 'city, photo_50, photo_100', v: '5.8'}, function(user) {
										$('.app_console').html('');
										$('.app_alert').html('');
										var win_date = new Date();
										var win_date_str = (win_date.getDate() < 10 ? '0' + win_date.getDate() : win_date.getDate())
											+ '.' + (win_date.getMonth() < 9 ? '0' + (win_date.getMonth() + 1)  : (win_date.getMonth() + 1))
											+ '.' + win_date.getFullYear() + ' ' + win_date.getHours() + ':' + win_date.getMinutes();
										$('.app_alert_title').html('Наши победители <span>[' + win_date_str + ']</span>');
										var win_user_city = '';
										for(var i = 0; i < user.response.length; i++) {
											win_user_city = user.response[i].city ? user.response[i].city.title : 'Нет данных ...';
											$('.app_console').html($('.app_console').html() + '<span>' + win_nums[i] + '</span>');
											$('.app_alert').html($('.app_alert').html() + '<div class="win_user"><div class="user_place">' + (i+1) + ' место</div><a href="http://vk.com/id' + user.response[i].id + '" target="_blank"><div class="user_foto" style="background-image: url(' + user.response[i].photo_50 + ')"></div><div class="user_name">' + user.response[i].first_name + ' ' + user.response[i].last_name + '<div class="user_city">' + win_user_city + '</div></div></a></div>');
										}
									});
								} else {
									$('.app_alert').html($('.app_alert').html() + '<p class="red">Выбранный тип данных недоступен. Проверьте количество лайков, репостов или комментариев.</p>');
								}
							}
						} else {
							$('.app_alert').html($('.app_alert').html() + '<p class="red">' + data.error.error_code + '// ' + data.error.error_msg + '</p>');
						}
					});
				}
				get_users_vk();
			} else {
				$('.app_alert').html($('.app_alert').html() + '<p class="red">' + post.error.error_code + '// ' + post.error.error_msg + '</p>');
			}
		});
	}

	$('#rm_nums_vk_form').submit(function() {
		$('#rm_nums_vk_form .btn_submit').addClass('run');
		var data_type = $('#rm_nums_vk_type').val();
		var rm_nums_vk_post = $('#rm_nums_vk_post').val();
		var rm_nums_vk_count = $('#rm_nums_vk_count').val();
		var posts_id = rm_nums_vk_post.slice(findInStr(rm_nums_vk_post, 'wall')+4);
		if(posts_id) {
			get_win_vk(posts_id, data_type, rm_nums_vk_count);
		} else {
			$('.app_alert').html($('.app_alert').html() + '<p class="red">Задана пустая или неверная ссылка на пост!</p>');
		}
		$('#rm_nums_vk_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Игральные кубики (кости) */

	$('#rm_kubik_form_run').click(function() {
		$('#rm_kubik_form').trigger('submit');
		return false;
	});
	
	$('.rm_kubik_count').click(function() {
		$('.rm_kubik_count').removeClass('active');
		$(this).addClass('active');
		var rm_kubik_count = +$('.rm_kubik_count.active').text();
		var rm_kubik_list = $('.rm_kubik_img');
		rm_kubik_list.removeClass('active');
		for(var i = 0; i < rm_kubik_count; i++) {
			rm_kubik_list.eq(i).addClass('active');
		}
		$('#rm_kubik_form').trigger('submit');
		return false;
	});
	
	$('#rm_kubik_form').submit(function() {
		$('#rm_kubik_form .btn_submit').val('У-у-у-у ...').addClass('run');
		$('#rm_kubik_form .rm_kubik_img.active').addClass('shake');
		var rm_kubik_list_active = $('.rm_kubik_img.active');
		var rm_kubik_vclass_str = 'rm_kubik_v1  rm_kubik_v2  rm_kubik_v3  rm_kubik_v4  rm_kubik_v5 rm_kubik_v6';
		var rm_kubik_value = get_rm_int(1, 6);
		var rm_kubik_point_list = {};
		for(var i = 0; i < rm_kubik_list_active.length; i++) {
			rm_kubik_value = get_rm_int(1, 6);
			rm_kubik_list_active.eq(i).removeClass(rm_kubik_vclass_str).addClass('rm_kubik_v' + rm_kubik_value);
			rm_kubik_list_active.eq(i).children('.rm_kubik_point').removeClass('active');
			rm_kubik_point_list = rm_kubik_list_active.eq(i).children('.rm_kubik_point');
			switch(rm_kubik_value) {
				case 1:
					rm_kubik_point_list.eq(4).addClass('active');
					break;
				case 2:
					rm_kubik_point_list.eq(0).addClass('active');
					rm_kubik_point_list.eq(8).addClass('active');
					break;
				case 3:
					rm_kubik_point_list.eq(0).addClass('active');
					rm_kubik_point_list.eq(4).addClass('active');
					rm_kubik_point_list.eq(8).addClass('active');
					break;
				case 4:
					rm_kubik_point_list.eq(0).addClass('active');
					rm_kubik_point_list.eq(2).addClass('active');
					rm_kubik_point_list.eq(6).addClass('active');
					rm_kubik_point_list.eq(8).addClass('active');
					break;
				case 5:
					rm_kubik_point_list.eq(0).addClass('active');
					rm_kubik_point_list.eq(2).addClass('active');
					rm_kubik_point_list.eq(4).addClass('active');
					rm_kubik_point_list.eq(6).addClass('active');
					rm_kubik_point_list.eq(8).addClass('active');
					break;
				case 6:
					rm_kubik_point_list.eq(0).addClass('active');
					rm_kubik_point_list.eq(2).addClass('active');
					rm_kubik_point_list.eq(3).addClass('active');
					rm_kubik_point_list.eq(5).addClass('active');
					rm_kubik_point_list.eq(6).addClass('active');
					rm_kubik_point_list.eq(8).addClass('active');
					break;
			}
		}
		setTimeout($.proxy(function() {
			$('#rm_kubik_form .rm_kubik_img.active').removeClass('shake');
			$('#rm_kubik_form .btn_submit').val('Бросить кубик ...').removeClass('run');
		}), 500);
		
		return false;
	});
	
	$('#rm_kubik_form_run').trigger('click');
	
/* Подбрасывание монеты */

	$('#rm_moneta_form_run').click(function() {
		$('#rm_moneta_form').trigger('submit');
		return false;
	});
	
	$('.rm_moneta_count').click(function() {
		$('.rm_moneta_count').removeClass('active');
		$(this).addClass('active');
		var rm_moneta_valuta = 'valuta_' + $('#rm_moneta_valuta').val().toLowerCase();
		var rm_moneta_count = +$('.rm_moneta_count.active').text();
		var rm_moneta_list = $('.rm_moneta_img');
		var action_count = rm_moneta_count - rm_moneta_list.length;
		var action_flag = action_count >= 0 ? true : false;
		action_count = Math.abs(action_count);
		for(var i = 0; i < action_count; i++) {
			action_flag ? $('<span></span>').appendTo($('.app_console')).addClass('rm_moneta_img' + ' ' + rm_moneta_valuta) : rm_moneta_list.eq(i).remove();
		}
		$('#rm_moneta_form').trigger('submit');
		return false;
	});
	
	$('#rm_moneta_valuta').change(function() {
		var rm_moneta_valuta = 'valuta_' + $('#rm_moneta_valuta').val().toLowerCase();
		var valuta_class_str = 'valuta_rub valuta_usd valuta_eur';
		var rm_moneta_list = $('.rm_moneta_img');
		rm_moneta_list.removeClass(valuta_class_str);
		for(var i = 0; i < rm_moneta_list.length; i++) {
			rm_moneta_list.eq(i).addClass(rm_moneta_valuta);
		}
		$('#rm_moneta_form').trigger('submit');
		return false;
	});
	
	$('#rm_moneta_form').submit(function() {
		$('#rm_moneta_form .btn_submit').addClass('run');
		var rm_moneta_list = $('.rm_moneta_img');
		var variant_class_str = 'reshka orel';
		var rm_moneta_value = '';
		var rm_moneta_res_arr = [0, 0];
		for(var i = 0; i < rm_moneta_list.length; i++) {
			rm_moneta_value = get_rm_int(0, 1) ? 'reshka' : 'orel';
			rm_moneta_value == 'reshka' ?  rm_moneta_res_arr[0]++ :  rm_moneta_res_arr[1]++;
			rm_moneta_list.eq(i).removeClass(variant_class_str).addClass(rm_moneta_value);
		}
		$('.app_alert_title').html("Выпавшие результаты");
		$('.app_alert').html('<span>Решки: ' + rm_moneta_res_arr[0] + '\t\t\tОрлы: ' + rm_moneta_res_arr[1] + '</span>' + $('.app_alert').html());
		$('#rm_moneta_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#rm_moneta_form_run').trigger('click');
	
/* Обработка минус слов для контекста */

	$('#ya_stopwords_form_run').click(function() {
		$('#ya_stopwords_form').trigger('submit');
		return false;
	});
	
	$('#ya_stopwords_form').submit(function() {
		$('#ya_stopwords_form .btn_submit').addClass('run');
		$('.app_alert_title').html('Этапы обработки ключевых слов');
		$('.app_alert').html('');
		var ya_stopwords_list = $('#ya_stopwords_list').val();
		ya_stopwords_list = ya_stopwords_list.replace(new RegExp('[\+\.\?!,;:]','g'), '');
		$('.app_alert').html($('.app_alert').html() + '<span>1. Удалены знаки препинания и спецсимволы (+.?!,;:)</span>');
		ya_stopwords_list = ya_stopwords_list.split('\n');
		$('.app_alert').html($('.app_alert').html() + '<span>2. Ключевые фразы загружены в обработчик</span>');
		var ya_stopwords_arr = [];
		for(var i = 0; i < ya_stopwords_list.length; i++) {
			ya_stopwords_arr = ya_stopwords_arr.concat(ya_stopwords_list[i].split(' '));
		}
		$('.app_alert').html($('.app_alert').html() + '<span>3. Поисковые фразы разбиты на ключевые слова</span>');
		ya_stopwords_arr = uniq_arr(ya_stopwords_arr);
		$('.app_alert').html($('.app_alert').html() + '<span>4. Удалены дубли в ключевых словах</span>');
		ya_stopwords_arr = ya_stopwords_arr.sort();
		$('.app_alert').html($('.app_alert').html() + '<span>5. Ключевые слова отсортированы по алфавиту</span>');
		$('#ya_stopwords_list').val(ya_stopwords_arr.join('\n'));
		$('.app_alert').html($('.app_alert').html() + '<span>Готово!</span>');
		$('#ya_stopwords_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Обработка ключевых слов */

	$('#keywords_form_run').click(function() {
		$('#keywords_form').trigger('submit');
		return false;
	});
	
	$('#keywords_form').submit(function() {
		$('#keywords_form .btn_submit').addClass('run');
		$('.app_alert_title').html('Запись действий');
		var keywords_list = $('#keywords_list').val();
		var keywords_actions = $('#keywords_actions').val().toLowerCase();
		keywords_list = keywords_list.split('\n');
		switch(keywords_actions) {
			case 'no_duble':
				keywords_list = uniq_arr(keywords_list);
				$('.app_alert').html($('.app_alert').html() + '<span>Удалены полные дубли в ключевых словах</span>');
				break;
			case 'no_duble_stem':
				var stemmer = new PorterStemRu();
				stemmer.Stem_Caching = 1; // 0|1 вкл/выкл кэш
				var word_stemms = {};
				keywords_list.map(function(keyword) {
					var words_arr = keyword.split(' ');
					words_arr = words_arr.map(function(word) {
						return stemmer.stem_word(word);
					});
					word_stemms[words_arr.join('_')] = keyword;
				});
				stemmer.clear_stem_cache(); // Чистим кэш
				keywords_list = [];
				for(var key in word_stemms)
					keywords_list.push(word_stemms[key]);
				$('.app_alert').html($('.app_alert').html() + '<span>Удалены дубли в ключевых словах (с учётом основ)</span>');
				break;
			case 'sort_a':
				keywords_list = keywords_list.sort();
				$('.app_alert').html($('.app_alert').html() + '<span>Ключевые слова отсортированы по алфавиту (прямой порядок)</span>');
				break;
			case 'sort_b':
				keywords_list = keywords_list.sort();
				keywords_list = keywords_list.reverse();
				$('.app_alert').html($('.app_alert').html() + '<span>Ключевые слова отсортированы по алфавиту (обратный порядок)</span>');
				break;
			case 'del_empty':
				keywords_list = keywords_list.filter(function(keyword) {
						return !(keyword == undefined || keyword == null || keyword.search(new RegExp('^\\s*$', 'g')) != -1);
				});
				$('.app_alert').html($('.app_alert').html() + '<span>Удаление пустых строк (с пробелами)</span>');
				break;
			case 'r_order':
				keywords_list = keywords_list.reverse();
				$('.app_alert').html($('.app_alert').html() + '<span>Обратный порядок</span>');
				break;
			case 'rm_order':
				keywords_list = shuffle(keywords_list);
				$('.app_alert').html($('.app_alert').html() + '<span>Случайный порядок</span>');
				break;
			case 'stem_words':
				var stemmer = new PorterStemRu();
				stemmer.Stem_Caching = 1; // 0|1 вкл/выкл кэш
				keywords_list = keywords_list.map(function(keyword) {
					var words_arr = keyword.split(' ');
					words_arr = words_arr.map(function(word) {
						return stemmer.stem_word(word);
					});
					return words_arr.join(' ');
				});
				stemmer.clear_stem_cache(); // Чистим кэш
				$('.app_alert').html($('.app_alert').html() + '<span>Выделение основ (стемминг Портера)</span>');
				break;
			case 'str-2-1':
				keywords_str = keywords_list.join(' ');
				keywords_list = [keywords_str];
				$('.app_alert').html($('.app_alert').html() + '<span>Объединение в одну строку (через пробел)</span>');
				break;
			case 'registr_m':
				keywords_list = keywords_list.map(function(keyword) {
					return keyword.toLowerCase();
				});
				$('.app_alert').html($('.app_alert').html() + '<span>Все строчные буквы</span>');
				break;
			case 'registr_b':
				keywords_list = keywords_list.map(function(keyword) {
					return keyword.toUpperCase();
				});
				$('.app_alert').html($('.app_alert').html() + '<span>все ПРОПИСНЫЕ буквы</span>');
				break;
			case 'registr_z':
				keywords_list = keywords_list.map(function(keyword) {
					return keyword.charAt(0).toUpperCase() + keyword.slice(1);
				});
				$('.app_alert').html($('.app_alert').html() + '<span>Строки с Заглавной буквы</span>');
				break;
			case 'del_2probel':
				keywords_list = keywords_list.map(function(keyword) {
					return keyword.replace(new RegExp('\\s+', 'g'), ' ');
				});
				$('.app_alert').html($('.app_alert').html() + '<span>Удалены двойные пробелы</span>');
				break;
			case 'del_probel':
				keywords_list = keywords_list.map(function(keyword) {
					return keyword.replace(new RegExp('^\\s+|\\s+$', 'g'), '');
				});
				$('.app_alert').html($('.app_alert').html() + '<span>Удаление начальных и конечных пробелов</span>');
				break;
		}
		$('#keywords_list').val(keywords_list.join('\n'));
		$('#keywords_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Punycode конвертер */

	$('#punycode_from_rf').click(function() {
		$('#punycode_text').val(punycode.toASCII($('#rf_text').val()));
		return false;
	});
	
	$('#punycode_to_rf').click(function() {
		$('#rf_text').val(punycode.toUnicode($('#punycode_text').val()));
		return false;
	});
	
/* Открытие ссылок в разных вкладках браузера */

	$('#links2tabs_form_run').click(function() {
		$('#links2tabs_form').trigger('submit');
		return false;
	});
	
	$('#links2tabs_form').submit(function() {
		$('#links2tabs_form .btn_submit').addClass('run');
		var links2tabs_list = $('#links2tabs_list').val().split('\n')
		for(var i = 0; i < links2tabs_list.length; i++) {
			window.open(links2tabs_list[i], '_blank');
		}
		$('#links2tabs_form .btn_submit').removeClass('run');
		return false;
	});
	
/* Генерация паролей */

// Генератор паролей из цифр, букв или спецсимволов
	function get_rmstr(lenstr_min, lenstr_max, type) {
		lenstr_min = (typeof lenstr_min !== 'undefined') ? lenstr_min : 6;
		lenstr_max = (typeof lenstr_max !== 'undefined') ? lenstr_max : 6;
		type = (typeof type !== 'undefined') ? type : 1;
		str1 = '1234567890';
		str2 = 'abcdefghijklmnopqrstuvwxyz';
		str3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		str4 = '%&^$#@!?~_{}[]+=-';
		switch(type) {
			case '1':
				str = str1;
				break;
			case '2':
				str = str2;
				break;
			case '3':
				str = str3;
				break;
			case '4':
				str = str4;
				break;
			case '12':
				str = str1 + str2;
				break;
			case '13':
				str = str1 + str3;
				break;
			case '14':
				str = str1 + str4;
				break;
			case '23':
				str = str2 + str3;
				break;
			case '24':
				str = str2 + str4;
				break;
			case '34':
				str = str3 + str4;
				break;
			case '123':
				str = str1 + str2 + str3;
				break;
			case '124':
				str = str1 + str2 + str4;
				break;
			case '134':
				str = str1 + str3 + str4;
				break;
			case '234':
				str = str2 + str3 + str4;
				break;
			case '1234':
				str = str1 + str2 + str3 + str4;
				break;
			default:
				str = str1;
		}
		rstr = '';
		lenstr = get_rm_int(lenstr_min, lenstr_max);
		for (var i = 0; i < lenstr; i++) {
			if(i > (lenstr/4) && str.length > 10) { // Не только цифры и больше четверти пароля сгенерировано
				rstr += str[get_rm_int(0, Math.ceil(str.length/4)-1)];
			} else {
				rstr += str[get_rm_int(0, str.length-1)];
			}
		}
		return rstr;
	}
	
	$('#rm_passwords_form_run').click(function() {
		$('#rm_passwords_form').trigger('submit');
		return false;
	});
	
	$('.rm_passwords_type').change(function() {
		$('#rm_passwords_form').trigger('submit');
	});
	
	$('#rm_passwords_form').submit(function() {
		$('#rm_passwords_form .btn_submit').addClass('run');
		var rm_passwords_count = +$('#rm_passwords_count').val();
		var rm_passwords_min = +$('#rm_passwords_min').val();
		var rm_passwords_max = +$('#rm_passwords_max').val();
		var $type = '';
		$type += $('#rm_passwords_nums').is(':checked') ? '1' : '';
		$type += $('#rm_passwords_smallchars').is(':checked') ? '2' : '';
		$type += $('#rm_passwords_bigchars').is(':checked') ? '3' : '';
		$type += $('#rm_passwords_spchars').is(':checked') ? '4' : '';
		$('.app_console').html('');
		for(var i = 1; i <= rm_passwords_count; i++) {
			$('.app_console').html($('.app_console').html() + '<span>' + get_rmstr(rm_passwords_min, rm_passwords_max, $type) + '</span>');
		}
		$('#rm_passwords_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#rm_passwords_form_run').trigger('click');
	
/* Генерация примеров заголовков и УТП */

	$('#utp_title_form_run').click(function() {
		$('#utp_title_form').trigger('submit');
		return false;
	});
	
	$('#utp_title_form').submit(function() {
		// utp_title_list - JSON объект из подключаемого файла
		$('#utp_title_form .btn_submit').addClass('run');
		$('.app_console').html('');
		var item = 0;
		for(var i = 1; i <= 3; i++) {
			item = get_rm_int(0, utp_title_list.length-1);
			$('.app_console').html($('.app_console').html() + '<span>[' + utp_title_list[item]['method'] +' :: ' + utp_title_list[item]['type'] + '] &laquo;' + utp_title_list[item]['title'] + '&raquo;</span>');
		}
		$('#utp_title_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#utp_title_form_run').trigger('click');
	
/* Генерация случайного текста рыбы */

// Количество слов в тексте
	function get_str_wcount(item_text) {
		var buffer = item_text.match(/\s+[^\f\r\n]/gim);
		if(typeof(buffer) == "object" && buffer != null) 
			return typeof(buffer.length) == "number" ? buffer.length+1 : 0;
	}
// Обрезка текста по количеству слов
	function trim_str_wcount(item_text, wcount) {
		var word_pos = -1;
		var i_words = 0;
		while(i_words < wcount) {
			if((word_pos = findInStr(item_text, ' ', word_pos + 1)) != -1) {
				i_words++;
			}
		}
		item_text = item_text.slice(0, word_pos) + '...';
		return item_text;
	}

	$('#fish_text_form_run').click(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});

	$('#fish_text_type').change(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});
	
	$('#fish_text_count').change(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});

	$('#fish_text_pcount').change(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});
	
	$('#fish_text_pshow').change(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});

	$('#fish_text_rm_zp').change(function() {
		$('#fish_text_form').trigger('submit');
		return false;
	});
	
	$('#fish_text_form').submit(function() {
		// fish_text_parts - JSON объект из подключаемого файла
		$('#fish_text_form .btn_submit').addClass('run');
		var fish_text_type = $('#fish_text_type').val();
		var fish_text_count = +$('#fish_text_count').val();
		var fish_text_pcount = +$('#fish_text_pcount').val();
		var fish_text_rm_zp = $('#fish_text_rm_zp').is(':checked') ? 1 : 0;
		var fish_text_pshow = $('#fish_text_pshow').is(':checked') ? 1 : 0;
		var fish_text_pstr = '.!.?.';
		var fish_text_arr = [];
		var sep_parts = '';
		if(fish_text_type == 'ru_text') {
			fish_text_arr = fish_text_parts['ru_text'];
			sep_parts = ' ';
		} else if(fish_text_type == 'en_text') {
			fish_text_arr = fish_text_parts['en_text'];
			sep_parts = ', ';
		}
		$('.app_console').html('');
		var item = 0;
		var fish_text_wcount = 0;
		var fish_text = [];
		var item_text = '';
		var run = true;
		while(run) {
			item = get_rm_int(0, fish_text_arr['one'].length-1);
			item_text = fish_text_arr['one'][item];
			item = get_rm_int(0, fish_text_arr['two'].length-1);
			item_text += sep_parts + fish_text_arr['two'][item];
			item = get_rm_int(0, fish_text_arr['three'].length-1);
			item_text += sep_parts + fish_text_arr['three'][item];
			if(fish_text_type == 'ru_text') {
				item = get_rm_int(0, fish_text_arr['four'].length-1);
				item_text += sep_parts + fish_text_arr['four'][item];
			}
			if(fish_text_rm_zp == 1) {
				item = get_rm_int(0, fish_text_pstr.length-1);
				item_text += fish_text_pstr[item];
			} else {
				item_text += '.';
			}
			fish_text_wcount += get_str_wcount(item_text);
			if(fish_text_wcount >= fish_text_count) {
				var trim_count = get_str_wcount(item_text) - (fish_text_wcount - fish_text_count);
				item_text = trim_str_wcount(item_text, trim_count);
				run = false;
			}
			fish_text[fish_text.length] = item_text;
		}
		var pcount_interval = 1;
		var fish_text_str = '';
		if(fish_text_pcount > 1) {
			fish_text_pcount = fish_text_pcount < fish_text.length ? fish_text_pcount-1 : fish_text.length; // Абзацев не может быть больше, чем предложений в тексте. Бревно из 5 частей за 4 распила
			pcount_interval = Math.round((fish_text.length)/fish_text_pcount);
			for(var i = 0; i < fish_text.length; i++) {
				if(((i+1) % pcount_interval) == 0 && i > 0) {
					if(fish_text_pshow) {
						fish_text[i] = '&lt;/p&gt;</p><p>&lt;p&gt;' + fish_text[i];
					} else {
						fish_text[i] = '</p><p>' + fish_text[i];
					}
					if(fish_text_pcount > 1)
						pcount_interval = Math.round((fish_text.length-i-1)/--fish_text_pcount);
					fish_text_str += fish_text[i];
				} else if(i == 0)  {
					fish_text_str += fish_text[i];
				} else {
					fish_text_str += ' ' + fish_text[i];
				}
			}
			if(fish_text_pshow) {
				fish_text_str = '<p>&lt;p&gt;' + fish_text_str + '&lt;/p&gt;</p>';
			} else {
				fish_text_str = '<p>' + fish_text_str + '</p>';
			}
		} else {
			if(fish_text_pshow) {
				fish_text_str = '<p>&lt;p&gt;' + fish_text.join(' ') + '&lt;/p&gt;</p>';
			} else {
				fish_text_str = '<p>' + fish_text.join(' ') + '</p>';
			}
		}
		$('.app_console').html($('.app_console').html() + fish_text_str);
		$('#fish_text_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#fish_text_form_run').trigger('click');
	
/* Шифрование md5, base64, sha-1 */

	$('#htext_form_run').click(function() {
		$('#htext_form').trigger('submit');
		return false;
	});
	
	$('#htext_type').change(function() {
		$('#htext_form').trigger('submit');
		return false;
	});
	
	$('#htext_form').submit(function() {
		// Применяются функции из библиотеки gs-md5-base64-sha-1.js
		$('#htext_form .btn_submit').addClass('run');
		var htext_input = $('#htext_input').val();
		var htext_output = '';
		var htext_type = $('#htext_type').val().toLowerCase();
		switch(htext_type) {
			case 'md5':
				htext_output = MD5.encode(htext_input);
				break;
			case 'base64e':
				htext_output = Base64.encode(htext_input);
				break;
			case 'sha-1':
				htext_output = SHA_1.encode(htext_input);
				break;
			case 'base64d':
				htext_output = Base64.decode(htext_input);
				break;
			default: htext_output = htext_input;
		}
		$('#htext_output').val(htext_output);
		$('#htext_form .btn_submit').removeClass('run');
		return false;
	});

/* Генератор списка имён или ников */
// Функция замены сочетаний букв на цифры и спецсимволы
	function str2num(str_text) {
		var str_str = "Sh_Ch_Zh_For_Sto_To_I_O_A_S_E_L_P_sh_ch_zh_for_sto_to_i_o_a_b_s_e_l_ov".split('_');
		var num_str = "III_4_4_}|{_100_2_1_0_@_$_3_JI_II_III_4_4_}|{_100_2_1_0_@_6_$_3_ji_OFF".split('_');
		var num_text = str_text;
		for(i=0; i<str_str.length; i++)
			num_text = num_text.replace(new RegExp(str_str[i], 'g'), num_str[i]);
		return num_text;
	};
// Функция утраивания букв
	function str_char3(str_text) {
		var str_str = "Z_X_V_K_Y_T_O_A_S_z_x_v_k_y_t_o_a_s".split('_');
		var char3_str = "zZz_xXx_vVv_kKk_yYy_TTT_oOo_aAa_sSs_zZz_xXx_vVv_kKk_yYy_TTT_oOo_aAa_sSs".split('_');
		var char3_text = str_text;
		var new_text = char3_text;
		for(i=0; i<str_str.length; i++) {
			char3_text = char3_text.replace(new RegExp(str_str[i], 'g'), char3_str[i]);
			if(new_text != char3_text) {
				new_text = char3_text;
				break;
			}
		}
		return char3_text;
	};
// Функция приписки postfix
	function str_postfix(str_text, male_female) {
		var arr_ends = ['.plus', '.cool', '.super', '.star', '-y-y-y', '-a-a-a', '.XXX', '.TV', '.crazy', '.turbo'];
		if(male_female == 'male') {
			arr_ends = arr_ends.concat(['fix', '.fox', '.man', 'cha', 'ix', 'ex', 'or', 'tor', 'ter', 'er', 'ator', 'trix']);
		} else if(male_female == 'female') {
			arr_ends = arr_ends.concat(['.belly', '.foxy', '.kiss', 'xy', 'ksi', 'bell', 'ry', 'trixy', 'luxy', '.sweet', '.shy', '.moon', '.pretty']);
		}
		var new_text = str_text + arr_ends[get_rm_int(0, arr_ends.length-1)];
		return new_text;
	};
// Буквы через точку
	function str_pointer(str_text) {
		var new_text = '';
		for(i=0; i<str_text.length; i++) {
			if(i == --str_text.length || str_text[i] == '.') {
				new_text += str_text[i];
			} else {
				new_text += str_text[i] + '.';
			}
		}
		new_text = new_text.replace('..', '.');
		return new_text;
	};
// Случайный регистр букв
	function str_rm_registr(str_text) {
		var new_text = '';
		for(i=0; i<str_text.length; i++)
			new_text += get_rm_int(0, 1) ? str_text[i].toUpperCase() : str_text[i].toLowerCase();
		return new_text;
	};
// Добавление года к строке
	function str_addyear(str_text) {
		var now = new Date();
		var now_year = String(now.getFullYear());
		var new_text = str_text + now_year.slice(get_rm_int(0, 2));
		return new_text;
	}
// 1-я буква от имени или фамилии
	function str_1char(str_text) {
		var str_text_arr = str_text.split('.');
		if(get_rm_int(0, 1)) {
			str_text_arr.reverse();
		}
		str_text_arr[0] = str_text_arr[0].charAt(0);
		var new_text =  str_text_arr.join('.');
		return new_text;
	}
// Функция для генерации вариантов никнеймов на основе имени или фамилии
	function rm_nick_action(rm_name_fio, action_num, male_female) {
		rm_names_fio = ru2tr(rm_names_fio, 'gost');
		rm_names_fio = rm_names_fio.replace(new RegExp(" ", 'g'), '.');
		rm_nickname = rm_names_fio;
		switch(action_num) {
			case 0: // Выдаём без преобразований
				break;
			case 1: // Обратный порядок
				rm_nickname = rm_nickname.split('.').reverse().join('.');
				break;
			case 2: // Буквы через точку
				rm_nickname = str_pointer(rm_nickname);
				break;
			case 3: // Замены букв на цифры
				rm_nickname = str2num(rm_nickname);
				break;
			case 4: // 1-я буква от имени или фамилии
				rm_nickname = str_1char(rm_nickname);
				break;
			case 5: // Утраивание букв
				rm_nickname = str_char3(rm_nickname);
				break;
			case 6: // Добавление даты
				rm_nickname = str_addyear(rm_nickname);
				break;
			case 7: // Приписки слов или букв
				rm_nickname = str_postfix(rm_nickname, male_female);
				break;
			case 8: // Случайный регистр
				rm_nickname = str_rm_registr(rm_nickname);
				break;
			case 9: // Буквы на цифры и дата
				rm_nickname = str2num(rm_nickname);
				rm_nickname = str_addyear(rm_nickname);
				break;
			case 10: // 1-я буква и дата
				rm_nickname = str_1char(rm_nickname);
				rm_nickname = str_addyear(rm_nickname);
				break;
			case 11: // Буквы на цифры и приписки
				rm_nickname = str2num(rm_nickname);
				rm_nickname = str_postfix(rm_nickname, male_female);
				break;
			case 12: // 1-я буква и приписки
				rm_nickname = str_1char(rm_nickname);
				rm_nickname = str_postfix(rm_nickname, male_female);
				break;
			case 13: // Буквы на цифры, приписки и дата
				rm_nickname = str2num(rm_nickname);
				rm_nickname = str_postfix(rm_nickname, male_female);
				rm_nickname = str_addyear(rm_nickname);
				break;
			case 14: // Буквы на цифры, приписки, случайный регистр и дата
				rm_nickname = str2num(rm_nickname);
				rm_nickname = str_postfix(rm_nickname, male_female);
				rm_nickname = str_rm_registr(rm_nickname);
				rm_nickname = str_addyear(rm_nickname);
				break;
		}
		return rm_nickname;
	}
	
	$('#rm_names_form_run').click(function() {
		$('#rm_names_form').trigger('submit');
		return false;
	});
	
	$('input[name="rm_names_type"]').change(function() {
		$('#rm_names_form').trigger('submit');
		return false;
	});
	
	$('#rm_names_count').change(function() {
		$('#rm_names_form').trigger('submit');
		return false;
	});
	
	$('#rm_names_male').change(function() {
		$('#rm_names_form').trigger('submit');
		return false;
	});
	
	$('#rm_names_female').change(function() {
		$('#rm_names_form').trigger('submit');
		return false;
	});
	
	$('#rm_names_form').submit(function() {
// names_lists - JSON объект из подключаемого файла
		$('#rm_names_form .btn_submit').addClass('run');
		var rm_names_count = +$('#rm_names_count').val();
		var rm_names_type = $('input[name="rm_names_type"]:checked').val();
		var rm_names_male = $('#rm_names_male').is(':checked') ? 1 : 0;
		var rm_names_female = $('#rm_names_female').is(':checked') ? 1 : 0;
		$('.app_console').html('');
		var rm_names_output = [];
		if(rm_names_type == 'nicks') {
			var nick_parts = names_lists['nick_2en_parts'].split('-');
			var nick_male_end = names_lists['male_2en_end'].split('-');
			var nick_female_end = names_lists['female_2en_end'].split('-');
			var rm_nick = '';
			for(var i = 0; i < rm_names_count; i++) {
				var nick_len = get_rm_int(2, 6);
				rm_nick = '';
				while(rm_nick.length < nick_len) {
					rm_nick += nick_parts[get_rm_int(0, nick_parts.length-1)];
				}
				if((rm_names_male && rm_names_female) || (!rm_names_male && !rm_names_female)) {
					if(get_rm_int(0, 1)) {
						rm_nick += nick_male_end[get_rm_int(0, nick_male_end.length-1)];
					} else {
						rm_nick += nick_female_end[get_rm_int(0, nick_female_end.length-1)];
					}
				} else if(rm_names_male) {
					rm_nick += nick_male_end[get_rm_int(0, nick_male_end.length-1)];
				} else if(rm_names_female) {
					rm_nick += nick_female_end[get_rm_int(0, nick_female_end.length-1)];
				}
				rm_nick = rm_nick.charAt(0).toUpperCase() + rm_nick.slice(1);
				rm_names_output.push(rm_nick);
			}
		} else if(rm_names_type == 'nicks_name') {
			rm_names_fio = $('#rm_names_fio').val();
			if(!rm_names_fio) {
				rm_names_fio = 'Иван Иванов';
				$('#rm_names_fio').val(rm_names_fio);
			}
			var actions_count = 15;
			var action_num = 0;
			var rm_nickname = rm_names_fio;
			for(var i = 0; i < rm_names_count; i++) {
				action_num = get_rm_int(0, actions_count-1);
				if((rm_names_male && rm_names_female) || (!rm_names_male && !rm_names_female)) {
					if(get_rm_int(0, 1)) {
						rm_nickname = rm_nick_action(rm_nickname, action_num, 'male');
					} else {
						rm_nickname = rm_nick_action(rm_nickname, action_num, 'female');
					}
				} else if(rm_names_male) {
					rm_nickname = rm_nick_action(rm_nickname, action_num, 'male');
				} else if(rm_names_female) {
					rm_nickname = rm_nick_action(rm_nickname, action_num, 'female');
				}
				rm_names_output.push(rm_nickname);
				rm_nickname = rm_names_fio;
			}
		} else if(rm_names_type == 'names') {
			var rm_fullname = '';
			var names_parts_1 = names_lists['male_names'];
			var names_parts_2 = names_lists['female_names'];
			var names2_parts_1 = names_lists['male_2names'];
			var names2_parts_2 = names_lists['female_2names'];
			var surnames_parts_1 =  names_lists['male_surnames'];
			var surnames_parts_2 = names_lists['female_surnames'];
			if($('#rm_names_fio').val() == '') {
				var rm_testname = get_rm_int(0, 1) ? surnames_parts_1[get_rm_int(0, surnames_parts_1.length-1)] + ' ' + names_parts_1[get_rm_int(0, names_parts_1.length-1)] : surnames_parts_2[get_rm_int(0, surnames_parts_2.length-1)] + ' ' + names_parts_2[get_rm_int(0, names_parts_2.length-1)];
				$('#rm_names_fio').val(rm_testname);
			}
			for(var i = 0; i < rm_names_count; i++) {
				if((rm_names_male && rm_names_female) || (!rm_names_male && !rm_names_female)) {
					if(get_rm_int(0, 1)) {
						rm_fullname = surnames_parts_1[get_rm_int(0, surnames_parts_1.length-1)] + ' ' + names_parts_1[get_rm_int(0, names_parts_1.length-1)] + ' ' + names2_parts_1[get_rm_int(0, names2_parts_1.length-1)];
					} else {
						rm_fullname = surnames_parts_2[get_rm_int(0, surnames_parts_2.length-1)] + ' ' + names_parts_2[get_rm_int(0, names_parts_2.length-1)] + ' ' + names2_parts_2[get_rm_int(0, names2_parts_2.length-1)];
					}
				} else if(rm_names_male) {
					rm_fullname = surnames_parts_1[get_rm_int(0, surnames_parts_1.length-1)] + ' ' + names_parts_1[get_rm_int(0, names_parts_1.length-1)] + ' ' + names2_parts_1[get_rm_int(0, names2_parts_1.length-1)];
				} else if(rm_names_female) {
					rm_fullname = surnames_parts_2[get_rm_int(0, surnames_parts_2.length-1)] + ' ' + names_parts_2[get_rm_int(0, names_parts_2.length-1)] + ' ' + names2_parts_2[get_rm_int(0, names2_parts_2.length-1)];
				}
				rm_names_output.push(rm_fullname);
			}
		}
		rm_names_output.forEach(function(item, i, arr) {
			$('.app_console').html($('.app_console').html() + '<span>' + item + '</span>');        
		});
		$('#rm_names_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#rm_names_form_run').trigger('click');
	
/* Имя, фамилия или отчество на транслите */
	
	$('#tr_name_form_run').click(function() {
		$('#tr_name_form').trigger('submit');
		return false;
	});
	
	$('#tr_name_type').change(function() {
		$('#tr_name_form').trigger('submit');
		return false;
	});
	
	$('#tr_name_form').submit(function() {
		$('#tr_name_form .btn_submit').addClass('run');
		var tr_name_input = $('#tr_name_input').val();
		var tr_name_type = $('#tr_name_type').val().toLowerCase();
		$('#tr_name_output').text(ru2tr($('#tr_name_input').val(), tr_name_type));
		if($('#male_2name') && $('#female_2name')) {
			$('#male_2name_tr').text(ru2tr($('#male_2name').text(), tr_name_type));
			$('#female_2name_tr').text(ru2tr($('#female_2name').text(), tr_name_type));
		}
		if($('#rm_fullname')) {
			$('#rm_fullname_tr').text(ru2tr($('#rm_fullname').text(), tr_name_type));
		}
		$('#tr_name_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#tr_name_form_run').trigger('click');

/* Города, регионы и страны на транслите */
	
	$('#tr_city_form_run').click(function() {
		$('#tr_city_form').trigger('submit');
		return false;
	});
	
	$('#tr_city_type').change(function() {
		$('#tr_city_form').trigger('submit');
		return false;
	});
	
	$('#tr_city_form').submit(function() {
		$('#tr_city_form .btn_submit').addClass('run');
		var tr_city_input = $('#tr_city_input').val();
		var tr_city_type = $('#tr_city_type').val().toLowerCase();
		$('#tr_city_output').text(ru2tr($('#tr_city_input').val(), tr_city_type));
		if($('#region')) {
			$('#region_tr').text(ru2tr($('#region').text(), tr_city_type));
		}
		$('#rm_sample_text_tr').text(ru2tr($('#rm_sample_text').text(), tr_city_type));
		$('#tr_city_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#tr_city_form_run').trigger('click');
	
/* ГСЧ для лотереи */

	$('#rm_lot_nums_form_run').click(function() {
		$('#rm_lot_nums_form').trigger('submit');
		return false;
	});
	
	$('#rm_lot_nums_type').change(function() {
		$('#rm_lot_nums_form').trigger('submit');
		return false;
	});
	
	$('.rm_lot_nums_tools_btn').click(function() {
		$('.rm_lot_nums_tools_btn').removeClass('active');
		$(this).addClass('active');
		$('#rm_lot_nums_form').trigger('submit');
		return false;
	});
	
	$('#rm_lot_nums_form').submit(function() {
		$('#rm_lot_nums_form .btn_submit').addClass('run');
		var flag_count = 1;
		var rm_lot_nums_type = $('#rm_lot_nums_type').val();
		switch(rm_lot_nums_type) {
			case '5x36':
				$('#rm_lot_nums_count').val(5);
				$('#rm_lot_nums_max').val(36);
				break;
			case '6x45':
				$('#rm_lot_nums_count').val(6);
				$('#rm_lot_nums_max').val(45);
				break;
			case '4x20':
				$('#rm_lot_nums_count').val(4);
				$('#rm_lot_nums_max').val(20);
				flag_count = 2;
				break;
			case '12x24':
				$('#rm_lot_nums_count').val(12);
				$('#rm_lot_nums_max').val(24);
				break;
			case '6x36':
				$('#rm_lot_nums_count').val(3);
				$('#rm_lot_nums_max').val(36);
				break;
			case '7x49':
				$('#rm_lot_nums_count').val(7);
				$('#rm_lot_nums_max').val(49);
				break;
			case '6x49':
				$('#rm_lot_nums_count').val(6);
				$('#rm_lot_nums_max').val(49);
				break;
		}
		var rm_lot_nums_count = +$('#rm_lot_nums_count').val();
		var rm_lot_nums_min = 1;
		var rm_lot_nums_max = +$('#rm_lot_nums_max').val();
		var rm_lot_nums_sep = ' ';
		var rm_lot_nums_uniq = true;
		var rm_nums_min = rm_lot_nums_min;
		var rm_nums_max = rm_lot_nums_max;
		var rm_lot_nums_action = $('.rm_lot_nums_tools_btn.active').attr('id');
		var flag_mod = -1;
		switch(rm_lot_nums_action) {
			case 'rm_action':
				break;
			case 'rm_2n_1_action':
				flag_mod = 1;
				break;
			case 'rm_2n_action':
				flag_mod = 0;
				break;
			case 'rm_top_action':
				rm_nums_max = Math.floor(rm_lot_nums_max/2);
				break;
			case 'rm_bottom_action':
				rm_nums_min = Math.floor(rm_lot_nums_max/2) + 1;
				break;
		}
		var rm_lot_nums_arr = [];
		var rm_num = 0;
		$('.app_console').html('');
		for(var k = 0; k < flag_count; k++) {
			rm_lot_nums_arr.push([]);
			for(var i = 1; i <= rm_lot_nums_count; i++) {
				rm_num = get_rm_int(rm_nums_min, rm_nums_max);
				if(rm_lot_nums_uniq) {
					if(find_arr(rm_lot_nums_arr[k], rm_num) == -1 && (flag_mod < 0 || rm_num % 2 == flag_mod)) {
						rm_lot_nums_arr[k].push(rm_num);
					} else if(i >= 1) {
						i--;
					}
				}
			}
		}
		var active_num_class = '';
		for(var k = 0; k < flag_count; k++) {
			for(var i = 1; i <= rm_lot_nums_max; i++) {
				if(find_arr(rm_lot_nums_arr[k], i) != -1) {
					active_num_class = ' class="active"';
				}
				if(i == rm_lot_nums_max && k < flag_count - 1) {
					$('.app_console').html($('.app_console').html() + '<span' + active_num_class + '>' + i + '</span><br /><br />');
				} else if(i == rm_lot_nums_max) {
					$('.app_console').html($('.app_console').html() + '<span' + active_num_class + '>' + i + '</span>');
				} else {
					$('.app_console').html($('.app_console').html() + '<span' + active_num_class + '>' + i + rm_lot_nums_sep + '</span>');
				}
				active_num_class = '';
			}
		}
		$('#rm_lot_nums_form .btn_submit').removeClass('run');
		return false;
	});
	
	$('#rm_lot_nums_form_run').trigger('click');
	
/* Секундомер, обратный отсчёт, интервальный таймер */

	var now_seconds = 0;
	var now_times = 1;
	var interval_type = 'work';
	var intervalVariable;

	function timerTick(type, timer_params) {
		now_seconds++;
		if(type == 'down') {
			if(timer_params.time_timer - now_seconds <= 0) {
				renderTimerNums(0);
				$('#timer_pause').trigger('click');
				$('#audio_beep')[0].play();
			} else {
				renderTimerNums(timer_params.time_timer - now_seconds);
			}
		} else if(type == 'interval') {
			if(interval_type == 'work') {
				if(timer_params.time_work - now_seconds > 0) {
					renderTimerNums(timer_params.time_work - now_seconds);
				} else {
					renderTimerNums(0);
					$('#audio_beep')[0].play();
					now_seconds = 0;
					interval_type = 'rest';
					$('.timer_panel_nums .timer_nums').removeClass('green');
					$('.timer_panel_nums .timer_nums').addClass('red');
				}
			} else if(interval_type == 'rest') {
				if(timer_params.time_rest - now_seconds > 0) {
					renderTimerNums(timer_params.time_rest - now_seconds);				
				} else {
					renderTimerNums(0);
					$('#audio_beep')[0].play();
					now_seconds = 0;
					now_times++;
					if(now_times >= timer_params.interval_count) {
						$('.timer_interval_nums.times').text(timer_params.interval_count);
						$('#timer_pause').trigger('click');
						now_seconds = 0;
						$('.timer_panel_nums .timer_nums').removeClass('red');
					} else {
						$('.timer_interval_nums.times').text(now_times);
						$('.timer_panel_nums .timer_nums').removeClass('red');
						$('.timer_panel_nums .timer_nums').addClass('green');
					}
					interval_type = 'work';
				}
			}
		} else {
			renderTimerNums(now_seconds);
		}
	}
	
	function secondsToTime(seconds) {
		var h = parseInt(seconds / 3600 % 24);
		var m = parseInt(seconds /  60 % 60);
		var s = parseInt(seconds % 60);
		return {'hours': leadZero(parseInt(h)), 'minutes': leadZero(parseInt(m)), 'seconds': leadZero(parseInt(s))};
	}

	function leadZero(num) {
		var s = "" + num;
		if (s.length < 2) {
			s = "0" + s ;
		}
		return s;
	}

	function renderTimerNums(seconds) {
		var timer_nums = secondsToTime(seconds)
		$('.timer_nums.hours').text(timer_nums.hours);
		$('.timer_nums.minutes').text(timer_nums.minutes);
		$('.timer_nums.seconds').text(timer_nums.seconds);
	}
	
	var timer_hours = 0;
	var timer_minutes = 0;
	var timer_seconds = 0;
	
	$('.timer_types_btn').click(function() {
		$('.timer_types_btn').removeClass('active');
		$(this).addClass('active');
		$('#timer_pause').trigger('click', {audio: 0});
		interval_type = 'work';
		$('.timer_panel_nums .timer_nums').removeClass('green red');
		timer_hours = $('.timer_nums.hours').text();
		timer_minutes = $('.timer_nums.minutes').text();
		timer_seconds = $('.timer_nums.seconds').text();
		switch($('.timer_types .active').data('type')) {
			case 'up_timer':
				$('.timer_panel_info').addClass('hide');
				$('.timer_panel_nums .timer_nums.hours').removeClass('hide');
				$('.timer_panel_nums .timer_sep').eq(0).removeClass('hide');
				break;
			case 'down_timer':
				$('.timer_panel_info').addClass('hide');
				$('.timer_panel_nums .timer_nums.hours').removeClass('hide');
				$('.timer_panel_nums .timer_sep').eq(0).removeClass('hide');
				var las_time_timer = timer_hours*60*60 + timer_minutes*60 + timer_seconds*1;
				if(las_time_timer == 0) {
					renderTimerNums(30);
				}
				now_seconds = 0;
				break;
			case 'interval_timer':
				$('.timer_panel_info').removeClass('hide');
				$('.timer_panel_nums .timer_nums.hours').addClass('hide');
				$('.timer_panel_nums .timer_sep').eq(0).addClass('hide');
				break;
		}
	});
	
	$('#timer_run').click(function() {
		$(this).addClass('hide');
		$('#timer_pause').removeClass('hide');
		timer_hours = $('.timer_nums.hours').text();
		timer_minutes = $('.timer_nums.minutes').text();
		timer_seconds = $('.timer_nums.seconds').text();
		var timer_params = {};
		$('#audio_beep')[0].play();
		switch($('.timer_types .active').data('type')) {
			case 'up_timer':
				now_seconds = timer_hours*60*60 + timer_minutes*60 + timer_seconds*1;
				seconds_1 = now_seconds;
				timer_params.time_timer = 0;
				intervalVariable = setInterval(timerTick, 1000, 'up', timer_params);
				break;
			case 'down_timer':
				timer_params.time_timer = timer_hours*60*60 + timer_minutes*60 + timer_seconds*1;
				seconds_1 = timer_params.time_timer;
				now_seconds = 0;
				intervalVariable = setInterval(timerTick, 1000, 'down', timer_params);
				break;
			case 'interval_timer':
				timer_params.time_work = $('.timer_interval_work .minutes').text()*60 + $('.timer_interval_work .seconds').text()*1;
				timer_params.time_rest = $('.timer_interval_rest .minutes').text()*60 + $('.timer_interval_rest .seconds').text()*1;
				timer_params.interval_count = $('.timer_interval_count .all_times').text()*1;
				now_times = $('.timer_interval_count .times').text()*1;
				if(now_times >= timer_params.interval_count) {
					now_times = 1;
					$('.timer_interval_count .times').text(now_times);
				}
				if(interval_type == 'work') {
					$('.timer_panel_nums .timer_nums').addClass('green');
					seconds_1 = timer_params.time_work;
				} else if(interval_type = 'rest') {
					$('.timer_panel_nums .timer_nums').addClass('red');
					seconds_1 = timer_params.time_rest;
				}
				intervalVariable = setInterval(timerTick, 1000, 'interval', timer_params);
				break;
		}
		return false;
	});
	
	$('#timer_pause').click(function(event, params) {
		if(params !== undefined) {
			if(params.audio === undefined) {
				params.audio = 1;
			}
		} else {
			params = {audio: 1};
		}
		$(this).addClass('hide');
		$('#timer_run').removeClass('hide');
		clearInterval(intervalVariable);
		if(params.audio) {
			$('#audio_beep')[0].play();
		}
		return false;
	});
	
	$('#timer_clear').click(function() {
		$('#timer_pause').trigger('click', {audio: 0});
		i = 0;
		$('.app_alert').html('');
		interval_type = 'work';
		$('.timer_panel_nums .timer_nums').removeClass('green red');
		switch($('.timer_types .active').data('type')) {
			case 'up_timer':
				renderTimerNums(0);
				seconds_1 = 0;
				now_seconds = 0;
				break;
			case 'down_timer':
				renderTimerNums(30);
				seconds_1 = 10;
				now_seconds = 0;
				break;
			case 'interval_timer':
				renderTimerNums(0);
				now_seconds = 0;
				now_times = 0;
				seconds_1 = 25;
				$('.timer_interval_work .minutes').text('00');
				$('.timer_interval_work .seconds').text('25');
				$('.timer_interval_rest .minutes').text('00');
				$('.timer_interval_rest .seconds').text('05');
				$('.timer_interval_count .times').text('1');
				$('.timer_interval_count .all_times').text('10');
				break;
		}
		return false;
	});
	
	var seconds_1 = 0;
	var i = 0;
	$('#timer_interval').click(function() {
		var timer_hours = $('.timer_nums.hours').text();
		var timer_minutes = $('.timer_nums.minutes').text();
		var timer_seconds = $('.timer_nums.seconds').text();
		var seconds_2 = (timer_hours*60*60 + timer_minutes*60 + timer_seconds*1);
		var delta_seconds = Math.abs(seconds_2 - seconds_1);
		$('.app_alert').html('<span>№' + (++i) + ' ' + timer_hours + ':' + timer_minutes + ':' + timer_seconds + ' разница: ' + delta_seconds + '</span>' + $('.app_alert').html());
		seconds_1 = seconds_2;
		return false;
	});
	
});