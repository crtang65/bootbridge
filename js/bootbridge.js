/*  
        Javascript bootbridge: 22/08/2017
		     		         Author: Angelo Cristella			 
							  
		Copyright (c) 2017  Angelo Cristella
		Licensed under the MIT license	
 */

	  var rKey='';    // random key
	  var clipboard_html=new Clipboard('#copy-button-html');
	  var clipboard_js=new Clipboard('#copy-button-js');
	  var clipboard_css=new Clipboard('#copy-button-css');
	  var gen_code=false;
	  var clip_error=false;
	  var tabs=[];
	  var accordion=[];
	  var comp_tooltip;
	  var comp_popover;
	  var comp_modal;
	  var comp_tabs;
	  var comp_alert;
	  var comp_collapse;
	  var comp_accordion;
	  var comp_carousel;
	  
	  
	  	  	  	  
	  $('#targetModal').on('show.bs.modal', function (e) {		  
		    var button = $(e.relatedTarget);						
			var labl = button.data('whatever') // Extract info from data-whatever attributes  
			var myModalLabel='#myModalLabel';
			var	myModalBody='#myModalBody';
			var but_clicked;
			
			switch(labl){
				case 'code':{but_clicked='Generate CODE';}break;
				case 'html':{but_clicked='Copy To Clipboard HTML';}break;
				case 'js'  :{but_clicked='Copy To Clipboard JS';}break;
				case 'css' :{but_clicked='Copy To Clipboard CSS';}break;
			}	
			
		    if (clip_error) {	
				$(myModalLabel).html(but_clicked);	
				$(myModalBody).html('<div style="color:red;width:50px;margin-left:auto;margin-right:auto"><h4>Error!</h4></div>');					
			}else{
				$(myModalLabel).html(but_clicked);	
				$(myModalBody).html('<div style="color:red;width:50px;margin-left:auto;margin-right:auto"><h4>Success!</h4></div>');		
			}	
		})	
	  	  
	  
	  
	/* Tooltip object's constructor */
	function cls_comp_tooltip(){
		/* Consider user's options setting */								
		this.opt_animation=$("select#animation-opt").val();							
		this.opt_placement=$("select#placement-opt").val();
		opt_trigger_array=$("select#trigger-opt").val();
		opt_trigger='';
		opt_trigger_array.forEach(function(item){opt_trigger+=item+' ';});							
		this.opt_trigger=opt_trigger.replace(/^\s+|\s+$/gm,'');   //trim not supported with IE8	
		//opt_trigger=$.trim(opt_trigger);    //alternate way
		this.opt_show=$("input#show-opt").val();							
		this.opt_hide=$("input#hide-opt").val(); 
		
		/* Methods definition */
		this.copy_to_clip_html_tooltip=copy_to_clip_html_tooltip;
		this.copy_to_clip_js_tooltip=copy_to_clip_js_tooltip;
		this.test_component_tooltip=test_component_tooltip;	
        this.copy_to_clip_css_component=copy_to_clip_css_component; 		
	}
	  
	/* Popover object's constructor */
	function cls_comp_popover(){
		/* Consider user's options setting */								
		this.opt_animation=$("select#animation-opt").val();							
		this.opt_placement=$("select#placement-opt").val();
		opt_trigger_array=$("select#trigger-opt").val();
		opt_trigger='';
		opt_trigger_array.forEach(function(item){opt_trigger+=item+' ';});							
		this.opt_trigger=opt_trigger.replace(/^\s+|\s+$/gm,'');   //trim not supported with IE8			
		this.opt_show=$("input#show-opt").val();							
		this.opt_hide=$("input#hide-opt").val(); 
		
		/* Methods definition */
		this.copy_to_clip_html_popover=copy_to_clip_html_popover;
		this.copy_to_clip_js_popover=copy_to_clip_js_popover;
		this.test_component_popover=test_component_popover;		
		this.copy_to_clip_css_component=copy_to_clip_css_component; 
	}

	/* Modal object's constructor */
	function cls_comp_modal(){
		/* Consider user's options setting */								
		this.opt_backdrop=$("select#backdrop-opt").val();							
		this.opt_keyboard=$("select#keyboard-opt").val();										
		this.opt_show=$("select#show-opt").val();	
		switch($("select#modal-size-opt").val()){
			case 'modal-sm': {this.size_modal='modal-sm'; }break;
			case 'modal-lg': {this.size_modal='modal-lg'; }break;
			default: this.size_modal=''; 
		}		
		this.fade_modal=($("select#modal-animation-opt").val()=='true')?'fade':'';
		this.whatever=$("#modal-whatever").val();
						
		/* Methods definition */
		this.copy_to_clip_html_modal=copy_to_clip_html_modal;
		this.copy_to_clip_js_modal=copy_to_clip_js_modal; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_modal=test_component_modal;				
	}
	
	/* Tabs object's constructor */
	function cls_comp_tabs(){
		/* Consider user's options setting */								
		this.markup=$("select#markup-opt-tab").val();							
		this.fade=($("select#fade-opt-tab").val()=='true')?'fade':'';										
								
		/* Methods definition */
		this.copy_to_clip_html_tabs=copy_to_clip_html_tabs;
		this.copy_to_clip_js_tabs=copy_to_clip_js_tabs; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_tabs=test_component_tabs;				
	}
	
	/* Alert object's constructor */
	function cls_comp_alert(){
		/* Consider user's options setting */								
		this.type_alert=$("select#type-opt-alert").val();							
		this.close_alert=($("select#close-opt-alert").val()=='true')?true:false;										
								
		/* Methods definition */
		this.copy_to_clip_html_alert=copy_to_clip_html_alert;
		this.copy_to_clip_js_alert=copy_to_clip_js_alert; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_alert=test_component_alert;				
	}
	
	/* Collapse object's constructor */
	function cls_comp_collapse(){
		/* Consider user's options setting */								
		this.type_collapse=$("select#type-opt-collapse").val();
        this.toggle_collapse=($("select#toggle-opt-collapse").val()=='true')?true:false;		
								
		/* Methods definition */
		this.copy_to_clip_html_collapse=copy_to_clip_html_collapse;
		this.copy_to_clip_js_collapse=copy_to_clip_js_collapse; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_collapse=test_component_collapse;				
	}
	
	/* Accordion object's constructor */
	function cls_comp_accordion(){
		/* Consider user's options setting */										
        this.toggle_accordion=($("select#toggle-opt-accordion").val()=='true')?' in':'';
										
		/* Methods definition */
		this.copy_to_clip_html_accordion=copy_to_clip_html_accordion;
		this.copy_to_clip_js_accordion=copy_to_clip_js_accordion; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_accordion=test_component_accordion;				
	}
	
	/* Carousel object's constructor */
	function cls_comp_carousel(){
		/* Consider user's options setting */										        
		this.interval=$("#interval-opt").val();		
		this.pause=($("select#pause-opt").val()=='hover')?'hover':null;
		this.wrap=($("select#wrap-opt").val()=='true')?true:false;
		this.keyboard=($("select#keyboard-opt").val()=='true')?true:false;
										
		/* Methods definition */
		this.copy_to_clip_html_carousel=copy_to_clip_html_carousel;
		this.copy_to_clip_js_carousel=copy_to_clip_js_carousel; 
		this.copy_to_clip_css_component=copy_to_clip_css_component;  
		this.test_component_carousel=test_component_carousel;				
	}
	
	    var palette=$("#sidebar");
		$( "img",palette ).draggable({
			  cursor: "move",
			  cursorAt: { top: -5, left: -5 },
			  helper: function( event ) {			    			    				
				return $( "<div class='ui-widget-header'>"+event.target.name+"</div>" );
			  }
		}); 
		
		$( "#component" ).droppable({
		  drop: function( event, ui ) {
			$("#component").val('Dropped');
			var comp_txt=$(ui.helper);			
			$(this).val(comp_txt[0].innerText);
			rKey=randomKey();
			$("#test-area").css({"display": "none"});
			gen_code=false;			
			$(".option").hide();
			switch(comp_txt[0].innerText){
				case 'tooltip': { $("#opt-area").show(); 
								  $("#opt-area").html($("#tpl-opt-tooltip-popover").html());	
								} break;
				case 'popover': { $("#opt-area").show(); 
							      $("#opt-area").html($("#tpl-opt-tooltip-popover").html());	
							    } break;	
				case 'modal'  : { $("#opt-area").show(); 
							      $("#opt-area").html($("#tpl-opt-modal").html());	
							    } break;	
				case 'tabs'  :  { $("#opt-area").show(); 
							      $("#opt-area").html($("#tpl-opt-tab").html());	
							    } break;	
				case 'alert' :  { $("#opt-area").show(); 
							      $("#opt-area").html($("#tpl-opt-alert").html());	
							    } break;	
				case 'collapse': { $("#opt-area").show(); 
							       $("#opt-area").html($("#tpl-opt-collapse").html());	
							     } break;	
                case 'accordion': { $("#opt-area").show(); 
							        $("#opt-area").html($("#tpl-opt-accordion").html());	
							      } break;	
				case 'carousel' : { $("#opt-area").show(); 
							        $("#opt-area").html($("#tpl-opt-carousel").html());	
							      } break;													
				default: 
			}			
		  }
		});
		
		/* Manage click alerts */	
		$(".alert span").click(function(){		 
			 close_alerts();
		  });
		    
	    /* Close all alerts */	
		function close_alerts(){
		     $("#data-source-alert").hide(); 
			 $("#component-alert").hide(); 
			 $("#gen-code-alert").hide(); 
			 $("#repeat-alert").hide(); 
			 $("#template-alert").hide(); 
			 $("#url-alert").hide(); 
			 $("#no-template-alert").hide();	
		} 
		
	  /* Copy to clipboard html code generated */ 	
	  function copy_to_clip_html(){			
		var c='';   //code 
		clip_error=true;	
		if(!gen_code){ $("#gen-code-alert").show(); return;}
		if(($("#source-data").val())==''){ $("#data-source-alert").show(); return;}
		switch($('#component').val()){
			case 'tooltip'  :{ c=comp_tooltip.copy_to_clip_html_tooltip(); }break;
			case 'popover'  :{ c=comp_popover.copy_to_clip_html_popover(); }break;
			case 'modal'    :{ c=comp_modal.copy_to_clip_html_modal(); }break;
			case 'tabs'     :{ c=comp_tabs.copy_to_clip_html_tabs(); }break;	
			case 'alert'    :{ c=comp_alert.copy_to_clip_html_alert(); }break;
			case 'collapse' :{ c=comp_collapse.copy_to_clip_html_collapse(); }break;
			case 'accordion':{ c=comp_accordion.copy_to_clip_html_accordion(); }break;
			case 'carousel' :{ c=comp_carousel.copy_to_clip_html_carousel(); }break;		    
            default: { c='Component not selected!'; $("#component-alert").show();}
		}
		document.getElementById("txtombra").value=c;
		clip_error=false;	
	  }
	  
	  /* Copy to clipboard javascript code generated */ 
	  function copy_to_clip_js(){	  
		var c='';   //code 
		clip_error=true;
		if(!gen_code){ $("#gen-code-alert").show(); return;}
		if(($("#source-data").val())==''){ $("#data-source-alert").show(); return;}
		switch($('#component').val()){
			case 'tooltip':{ c=comp_tooltip.copy_to_clip_js_tooltip(); }break;
			case 'popover':{ c=comp_popover.copy_to_clip_js_popover(); }break;
			case 'modal'  :{ c=comp_modal.copy_to_clip_js_modal(); }break;
			case 'tabs'   :{ c=comp_tabs.copy_to_clip_js_tabs(); }break;
			case 'alert'  :{ c=comp_alert.copy_to_clip_js_alert(); }break;	
			case 'collapse' :{ c=comp_collapse.copy_to_clip_js_collapse(); }break;	
			case 'accordion':{ c=comp_accordion.copy_to_clip_js_accordion(); }break;	
			case 'carousel' :{ c=comp_carousel.copy_to_clip_js_carousel(); }break;						   
            default: { c='Component not selected!'; $("#component-alert").show();}		
		}
		document.getElementById("txtombra").value=c;	
		clip_error=false;		
	  }
	
	  /* Copy to clipboard css code generated */ 
	  function copy_to_clip_css(){	  
		var c='';   //code 
		clip_error=true; 
		if(!gen_code){ $("#gen-code-alert").show(); return;}
		if(($("#source-data").val())==''){ $("#data-source-alert").show(); return;}
		switch($('#component').val()){
			case 'tooltip'  :{ c=copy_to_clip_css_component(); }break;
			case 'popover'  :{ c=copy_to_clip_css_component(); }break;
			case 'modal'    :{ c=copy_to_clip_css_component(); }break;
			case 'tabs'     :{ c=copy_to_clip_css_component(); }break;
			case 'alert'    :{ c=copy_to_clip_css_component(); }break;
			case 'collapse' :{ c=copy_to_clip_css_component(); }break;
			case 'accordion':{ c=copy_to_clip_css_component(); }break;
			case 'carousel' :{ c=copy_to_clip_css_component(); }break;					   	
            default: { c='Component not selected!'; $("#component-alert").show();}		
		}
		document.getElementById("txtombra").value=c;	
		clip_error=false;				
	  }
	  
	  
	/* Generate a code and test component */
	function test_component(){	
		clip_error=true;
		if(($("#source-data").val())==''){ $("#data-source-alert").show(); return;}
		else {
			if(TestUrl($("#source-data").val())){ $("#url-alert").show(); return; }
		}
		if(($("#component").val())==''){ $("#component-alert").show(); return;}
		if($.trim($("#mytextarea").val())== "") { $("#no-template-alert").show(); return; }
		if ($('input:radio[name=inlineRadioOptions]:checked').val()== undefined) { $("#repeat-alert").show(); return; }
		else {	               
			if ($('input:radio[name=inlineRadioOptions]:checked').val()== "yes"){
					if(name_prop($("#mytextarea").val())== "null") { $("#template-alert").show(); return; }
			}
		}
		$("#test-area").css({"display": "block"});
		$(".lbl-box-test").css({"display": "block"});
		gen_code=true;
		close_alerts();
		var c='';   //code 
		switch($('#component').val()){
			case 'tooltip'  :{  comp_tooltip=new cls_comp_tooltip();
							    comp_tooltip.test_component_tooltip(); 							  		
						     }break;
			case 'popover'  :{  comp_popover=new cls_comp_popover();
							    comp_popover.test_component_popover(); 			
					         }break;	
			case 'modal'    :{  comp_modal=new cls_comp_modal();
							    comp_modal.test_component_modal(); 			
					         }break;	
			case 'tabs'     :{  comp_tabs=new cls_comp_tabs();
							    comp_tabs.test_component_tabs(); 			
					         }break;	
			case 'alert'    :{  comp_alert=new cls_comp_alert();
							    comp_alert.test_component_alert(); 							  
					         }break;				
			case 'collapse' :{  comp_collapse=new cls_comp_collapse();
							    comp_collapse.test_component_collapse(); 							  
					         }break;	
			case 'accordion':{  comp_accordion=new cls_comp_accordion();
							    comp_accordion.test_component_accordion(); 							  
					         }break;					
			case 'carousel' :{  comp_carousel=new cls_comp_carousel();
							    comp_carousel.test_component_carousel(); 							  
					         }break;			   
            default: c='Component not selected!';				
		}
		clip_error=false;		
	};

	
	/* Generate a random string with min_len, max_len chars */
	function randomKey() {
		var CHARS = 'qwertyuiopasdfghjklzxcvbnm';
		var min_len=5, max_len=12;
		var k='', i, stringSize;
		
		while(k.length<5){
			k='';
			stringSize = Math.floor(Math.random()*max_len) + 1;
			for (i = 0; i < stringSize; i++) {
				k += CHARS[Math.floor(Math.random()*CHARS.length)]
			}
		}//end_while			
		return k;
	}
	
	/* Manage Component's menu area*/	
	$(".dropdown-menu li a").click(function(e){				
		var comp_menu=(e.target).textContent;
		comp_menu=comp_menu.toLowerCase();
		$("#component").val(comp_menu);
		rKey=randomKey();
		$("#test-area").css({"display": "none"});
		gen_code=false;			
		$(".option").hide();
		switch(comp_menu){
			case 'tooltip': { $("#opt-area").show(); 
							  $("#opt-area").html($("#tpl-opt-tooltip-popover").html());	
							} break;
			case 'popover': { $("#opt-area").show(); 
							  $("#opt-area").html($("#tpl-opt-tooltip-popover").html());	
							} break;	
			case 'modal'  : { $("#opt-area").show(); 
							  $("#opt-area").html($("#tpl-opt-modal").html());	
							} break;
			case 'tabs'  :  { $("#opt-area").show(); 
							  $("#opt-area").html($("#tpl-opt-tab").html());	
							} break;
            case 'alert'  : { $("#opt-area").show(); 
							  $("#opt-area").html($("#tpl-opt-alert").html());	
							} break;	
			case 'collapse' : { $("#opt-area").show(); 
							    $("#opt-area").html($("#tpl-opt-collapse").html());	
							  } break;	
			case 'accordion': { $("#opt-area").show(); 
							    $("#opt-area").html($("#tpl-opt-accordion").html());	
							  } break;						
			case 'carousel' : { $("#opt-area").show(); 
							    $("#opt-area").html($("#tpl-opt-carousel").html());	
							  } break;						
			default: 
		}
	});
	
	
    /* Called to test tooltip in the editor */
	function my_title(){			
		var titolo='<div style="width: '+$("#c_width").html()+'px; height: '+$("#c_height").html()+'px;">Loading...</div>';	/* Setting size */	    
		/* Call Ajax with jQuery */	
		$.getJSON( $("#source-data").val(), function( json ) {     	            
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						var prop_arry=name_prop($("#mytextarea").val());					
						var new_json=json[prop_arry].slice(0,$("#limit").val()); 
						json[prop_arry]=new_json;	
					}	
					titolo=Mustache.render($("#mytextarea").val(),json);			   
					$(".tltp-test").html(titolo);  
			});	/* End call Ajax */			 	
		return 	titolo;  //return Loading...
	}

    /* Called to test popover in the editor */
	function my_title_content(){
        var height_title=$("#c_height_title").html();				
		var titolo='<div style="width: '+$("#c_width").html()+'px; height: '+height_title+'px;">Loading...</div>';	/* Setting size */	    
		var cont='';
		/* Call Ajax with jQuery */	
		$.getJSON( $("#source-data").val(), function( json ) {     					
				    var code_html=$("#mytextarea").val();
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						cont=content(code_html);	
						cont=content_rend(cont,$("#limit").val(),json);	
						titolo=title(code_html);
						titolo=title_rend(titolo,json);						    	
					}else{
					   titolo=title(code_html);	
					   titolo=Mustache.render(titolo,json);
					   cont=content(code_html);	
					   cont=Mustache.render(cont,json);
				    }				   				   				   
				   $(".pop-test-title").html(titolo);  
				   $(".pop-test-content").html(cont); 	 
			});	/* End call Ajax */			 	
		return 	titolo;  //return Loading...
	}

		  
    /* Called to test modal in the editor */   
	function my_modal(e){
		var titolo, cont;
        var button = $(e.relatedTarget);						
		var labl = button.data('whatever') // Extract info from data-whatever attributes  
		var myModalLabel='#myModalLabelTest';
		var	myModalBody='#myModalBodyTest';
											
		/* Call Ajax with jQuery */	
		$.getJSON( $("#source-data").val(), function( json ) {     					
				    var code_html=$("#mytextarea").val();
					code_html=modal_data_whatever(code_html,labl);
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						cont=content(code_html);	
						cont=content_rend(cont,$("#limit").val(),json);	
						titolo=title(code_html);
						titolo=title_rend(titolo,json);						    	
					}else{
					   titolo=title(code_html);	
					   titolo=Mustache.render(titolo,json);
					   cont=content(code_html);	
					   cont=Mustache.render(cont,json);
				    }							
				   $(myModalLabel).html(titolo);  
				   $(myModalBody).html(cont); 					   
			});	/* End call Ajax */	
	}
	
	/* Modal: manage {{!data-whatever}} in template */
	function modal_data_whatever(code_html,data_whatever){	        	
		var re = /{{!data-whatever}}/g;
		code_html=code_html.replace(re,data_whatever);		
		return code_html;
	}
	
	/* Test tooltip - Loading data in sync mode Ajax */
	dataTest=function(url,limit) {	
		var prop_arry, new_json;
		$.ajax({type: "GET",
			   url: url,
			   dataType: "json",
			   async:false,
			   success: function(json) {
				   if(limit>0){   
					   prop_arry=name_prop($("#mytextarea").val());	
					   new_json=json[prop_arry].slice(0,limit); 
					   json[prop_arry]=new_json;	
				   }
				   code_html=Mustache.render($("#mytextarea").val(),json);
				   $(".tltp-test").html(code_html);  				  
				   // calculate size				   			    				  
				   $("#c_height").html($(".tltp-test").height());	  
				   $("#c_width").html($(".tltp-test").width()); 
		}})			
	}

	/* Test popover - Loading data in sync mode Ajax */
	dataTestPop=function(url,limit) {			
		$.ajax({type: "GET",
			   url: url,
			   dataType: "json",
			   async:false,
			   success: function(json) {
				   var titolo, cont, sizeHtml;
				   var code_html=$("#mytextarea").val();
				   if(limit>0){  
							cont=content(code_html);		
							cont=content_rend(cont,limit,json);
							titolo=title(code_html);
							titolo=title_rend(titolo,json);									
				   }else{
							titolo=title(code_html);
							titolo=Mustache.render(titolo,json);
							cont=content(code_html);
							cont=Mustache.render(cont,json);		
				   }				   				   				   
				   $(".pop-test-title").html(titolo);					
				   $(".pop-test-content").html(cont);
				   // calculate size
                   sizeHtml='<span id="c_height_title">'+$(".pop-test-title").height()+'</span>';
				   sizeHtml+='<span id="c_height_content">'+$(".pop-test-content").height()+'</span>';
				   $("#c_height").html(sizeHtml);	                     
				   $("#c_width").html($(".pop-test-content").width());				   					
		}})			
	}
	
	
	/* Popover, Modal : return not compiled template for title */
	function title(tmpl){		
		var re = /{{!start_title}}([^]*){{!end_title}}/;
		var found = tmpl.match(re);			
		var tit=found[1]+''; 			
		return tit;	  
	}
		
	/* Popover, Modal : return compiled template for title */
	function title_rend(tmpl,json){
		/* Limit json at 1 element */
		var prop_arry=name_prop(tmpl);					
		var new_json=json[prop_arry].slice(0,1); 
		json[prop_arry]=new_json;		
		var tit=Mustache.render(tmpl,json);	
		return tit;	 
	}
	
	/* Popover, Modal : return not compiled template for content */
	function content(tmpl){		
		var re = /{{!start_content}}([^]*){{!end_content}}/;
		var found = tmpl.match(re);				
		var cont=found[1]+'';  		
		return cont;	
	}
			
	/* Popover, Modal : return compiled template for content */
	function content_rend(tmpl,limit,json){
		/* Limit json at limit elements */
		var prop_arry=name_prop(tmpl);					
		var new_json=json[prop_arry].slice(0,limit); 
		json[prop_arry]=new_json;		
		var cont=Mustache.render(tmpl,json);
		return cont;
	}
	
	/* Test url's data-source: loading data in sync mode Ajax */
	TestUrl=function(url) {	
		var err;
		$.ajax({type: "GET",
			   url: url,
			   dataType: "json",
			   async:false,
		})
		.done(function() { err=false; }) 	 
		.fail(function() { err=true; }); 
		return err;	
	}

	/* Graphic effects on palette's component */
	$("img.c-palette").hover(function(){
		$(this).css({"width": "39px","height":"39px"}); 
	  }, function(){
		$(this).css({"width": "40px","height":"40px"}); 	
	});

	/* Minify string HTML  */
	function minifyHTML(html){
		var miny = html;		
		for( var i = 0; i < 9; i++ ) {
			switch(i){
				case 0:{miny = miny.replace(/\\/g,'\\\\');} break;
				case 1:{miny = miny.replace(/'/g,'\\\'');} break;
				case 2:{miny = miny.replace(/"/g,'\\\"');} break;
				case 3:{miny = miny.replace(/\r\n/g,'\\n');} break;
				case 4:{miny = miny.replace(/[\r\n]/g,'\\n');} break;
				case 5:{miny = miny.replace(/\t/g,'\\t');} break;
				case 6:{miny = miny.replace(new RegExp('--'+'>','g'),'--\'+\'>');} break;
				case 7:{miny = miny.replace(new RegExp('<!'+'--','g'),'<!\'+\'--');} break;
				case 8:{miny = miny.replace(/\//g,'\\\/');} break;
			}		
		}
		return miny;
	} 


	/* Return string name property */
	function name_prop(tmpl){
		var re = /{{#\w+}}/;
		var found = tmpl.match(re)+'';
		re=/\w+/;
		var name=found.match(re)+'';	
		return name;	
	}

	/* Make test component Tooltip */
	function test_component_tooltip(){
		/* Calculate size box */
		var c='<div style="margin-left:auto;margin-right:auto;width:200px;height:200px;">';
		c+='<br/><br/><br/><br/>';						
		c+='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner tltp-test" style="max-width:none; text-align:left;"></div></div>\' ';							
		c+='</div>';
		$("#test-area").html(c);	
		/* load simple data in sync mode Ajax */		
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='no') dataTest($("#source-data").val(),0);						
		else dataTest($("#source-data").val(),$("#limit").val());   
		c_height=$("#c_height").html();
		c_width=$("#c_width").html();								
		/* Activate component */
		c='<div style="margin-left:auto;margin-right:auto;width:200px;height:200px;">';		
		c+='<br/><br/><br/><br/>';
		c+='<button type="button" class="btn btn-default" data-toggle="tooltip" ';
		c+='data-template=\'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner tltp-test" style="max-width:none; text-align:left;"></div></div>\' ';
		c+='id="example">Tooltip on top</button>';																					
		c+='</div>';
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';
		$("#test-area").html(c);
		var animation_=(this.opt_animation=='true');
		$('#example').tooltip({title: my_title, html:true, animation: animation_, placement:this.opt_placement, delay: {show:this.opt_show, hide:this.opt_hide }, trigger: this.opt_trigger});							
	}

	/* Make test component Popover */
	function test_component_popover(){
		/* Calculate size box */		
		var c='<div style="margin-left:auto;margin-right:auto;width:200px;height:200px;">';
		c+='<br/><br/><br/><br/>';						
		c+='<div class="popover" role="tooltip" style="max-width:none;"><div class="arrow"></div><h3 class="popover-title pop-test-title"></h3><div class="popover-content pop-test-content"></div></div>';							
		c+='</div>';
		$("#test-area").html(c);
		$(".popover").css({"display": "block"}); 
		/* load collection data in sync mode Ajax */	
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='no') dataTestPop($("#source-data").val(),0);    						
		else dataTestPop($("#source-data").val(),$("#limit").val());    
		c_height=$("#c_height_content").html();
		c_width=$("#c_width").html();								
		/* Activate component */
		c='<div style="margin-left:auto;margin-right:auto;width:200px;height:200px;">';
		c+='<br/><br/><br/><br/>';
		c+='<button type="button" class="btn btn-default" data-toggle="popover" ';
		c+='data-template=\'<div class="popover" role="tooltip" style="max-width:none;"><div class="arrow"></div><h3 class="popover-title pop-test-title"></h3><div class="popover-content pop-test-content"></div></div>\' ';
		c+='id="example">Popover</button>';																					
		c+='</div>';
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';
		$("#test-area").html(c);
		var animation_=(this.opt_animation=='true');
		$('#example').popover({content:'<div style="width: '+c_width+'px; height: '+c_height+'px;">Wait...</div>', title: my_title_content, html:true, animation: animation_, placement:this.opt_placement, delay: {show:this.opt_show, hide:this.opt_hide }, trigger: this.opt_trigger});							
	}
	
	/* Make test component Modal */
	function test_component_modal(){
		var templ=$("#tpl-modal").html();
		templ=Mustache.render(templ,{size_modal: this.size_modal, fade_modal: this.fade_modal, whatever: this.whatever, rKey:''});		
		/* Activate component */
		var c='<div style="margin-left:auto;margin-right:auto;width:200px;height:200px;">';
		c+='<br/><br/><br/><br/>';
		c+=templ; 																		
		c+='</div>';				
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';		
		$("#test-area").html(c);	
		eval('$("#myModalTest").on("shown.bs.modal", function (e) { my_modal(e); })');
		var backdrop_=(this.opt_backdrop=='true');		
		var keyboard_=(this.opt_keyboard=='true');		
		var show_=(this.opt_show=='true');
		$('#myModalTest').modal({backdrop: backdrop_, keyboard: keyboard_, show: show_});		
	}
					
	/* Make test component Tabs */
	function test_component_tabs(){			
		$("#test-area").css({"background": "white"});
		tabs=options_tabs($("#mytextarea").val());  //array contained tabs
		var templ='<div id="myTabsTest"> \n';
		templ+='<!-- Nav tabs -->\n';
		templ+='<ul class="nav nav-'+comp_tabs.markup+'s" role="tablist">\n';
		tabs.forEach(function (tab,i){
			if (i==0) templ+='<li role="presentation" cclass="active"><a href="#'+tab+'" aria-controls="'+tab+'" role="tab" data-toggle="'+comp_tabs.markup+'">'+tab+'</a></li> \n';
			else templ+='<li role="presentation"><a href="#'+tab+'" aria-controls=	"'+tab+'" role="tab" data-toggle="'+comp_tabs.markup+'">'+tab+'</a></li> \n';
		});
		templ+='</ul> \n\n';
		templ+='<!-- Tab panes --> \n';
		templ+='<div class="tab-content"> \n';
		tabs.forEach(function (tab,i){
			if (i==0) templ+='<div role="tabpanel" class="tab-pane '+comp_tabs.fade+' in aactive" id="'+tab+'"></div> \n';
			else templ+='<div role="tabpanel" class="tab-pane '+comp_tabs.fade+'" id="'+tab+'"></div> \n';
		});
		templ+='</div> \n\n';
		templ+='</div> \n';			
		/* Activate component */
		var c='<div style="height:auto;">';
		c+='<br/><br/> \n';
		c+=templ; 																		
		c+='</div> \n';				
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';		
		$("#test-area").html(c);				
		if(comp_tabs.markup=='tab') eval('$(\'#myTabsTest a[data-toggle="tab"]\').on("shown.bs.tab", function (e) { my_tabs(e); })');
		else eval('$(\'#myTabsTest a[data-toggle="pill"]\').on("shown.bs.tab", function (e) { my_tabs(e); })');	
		
		$('#myTabsTest a[href=#'+tabs[0]+']').tab('show');	//Visual active tab			
	}
	
	/* Make test component Alert */
	function test_component_alert(){	
		var templ='<button type="button" class="btn btn-default" onclick="$(\'#my_alert\').show(); my_alert();" >Alert</button><br/><br/> \n';
		
		if(comp_alert.close_alert) {
			templ+='<div class="alert alert-'+comp_alert.type_alert+' alert-dismissible" id="my_alert" role="alert"> \n';	
			templ+='<button type="button" class="close" data-dismiss="aalert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \n';
		}else{
			templ+='<div class="alert alert-'+comp_alert.type_alert+'" id="my_alert" role="alert"> \n';	
		}
		templ+='<span id="my_alert_content">Wait...</span> \n';
		templ+='</div> \n';	
		/* Activate component */
		var c='<div style="height:auto;">';
		c+='<br/><br/> \n';
		c+=templ;		
		c+='</div> \n';				
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		
		c+='</style>';		
		$("#test-area").html(c);			
		
		$("#my_alert").hide();		
		$("#my_alert span").click(function(){ $("#my_alert").hide(); });
	}
	
	/* Called to test alert in the editor */   
	function my_alert(){
		var limit;	
		var content;	
		var code_html=$("#mytextarea").val();
		var source_data=$("#source-data").val();
		/* Call Ajax with jQuery */	
		$.getJSON( source_data, function( json ) {     									    					
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						/* Limit json at limit elements */
						limit=$("#limit").val();
						var prop_arry=name_prop(code_html);					
						var new_json=json[prop_arry].slice(0,limit); 
						json[prop_arry]=new_json;					    	
					}
					content=Mustache.render(code_html,json);	
				    $("#my_alert_content").html(content);  				   					   
			});	/* End call Ajax */	
	}	
	
	/* Return link target */
	function link_target(etarget){
	    var re = /#([^]*)/;
		var found = etarget.match(re);			
		return found[1]+'';
	}
	
	/* Return template for item */
	function templ_target(item,code_html){
	    var res = "{{!start_tab#"+item+"}}([^]*){{!end_tab#"+item+"}}";				
		var re = new RegExp(res);
		var found = code_html.match(re);			
		return found[1]+'';		
	}
	
	/* Called to test tabs in the editor */   
	function my_tabs(e){
		//e.target // newly activated tab
		//e.relatedTarget; // previous active tab
		var tab;
		var limit;
		var item=link_target(e.target+'');	
		var code_html=$("#mytextarea").val();
		var source_data=get_source_data_tab(code_html,item);	
		/* Call Ajax with jQuery */	
		$.getJSON( source_data, function( json ) {     									    
					code_html=templ_target(item,code_html);		
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						/* Limit json at limit elements */
						limit=$("#limit").val();
						var prop_arry=name_prop(code_html);					
						var new_json=json[prop_arry].slice(0,limit); 
						json[prop_arry]=new_json;		
						tab=Mustache.render(code_html,json);				    	
					}else{
						tab=Mustache.render(code_html,json);
				    }							
				    $("#"+item).html(tab);  				   					   
			});	/* End call Ajax */	
	}	
	
	/* Return array options Tabs */
	function options_tabs(tmpl){				
		var re = /{{!start_tab#\w+}}/g;
		var found = tmpl.match(re);	        
		var cont;  
		re =/{{!start_tab#([^]*)}}/;
		for(i=0; i<found.length; i++){
			cont=found[i].match(re);
			found[i]=cont[1];
		}					   
		return found;	
	}
	
	/* Return source-data of active tab */
	function get_source_data_tab(code_html,item){		
		var re = /{{!url#([^]*)#}}/;
		var templ=templ_target(item,code_html);		
		var found=templ.match(re);
		return (found[1]+'');	
	}
	
	/* Make test component Collapse */
	function test_component_collapse(){
		var templ;
		$("#test-area").css({"background": "white"});
		if(this.type_collapse=='button'){ 
		    templ='<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">';
			templ+='Button with data-target';
			templ+='</button>';
		}else{
		    templ='<a class="btn btn-primary" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">';
			templ+='Link with href';
			templ+='</a>';
		} 	
		templ+='<div class="collapse" id="collapseExample">';
		templ+='<div class="well" id="collapseExampleWell">';
		templ+='	Wait';
		templ+='</div>';
		templ+='</div>';
		/* Activate component */
		var c='<div style="height:auto;">';
		c+='<br/><br/> \n';
		c+=templ;		
		c+='</div> \n';				
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';		
		$("#test-area").html(c);
		if (this.toggle_collapse) $('#collapseExample').collapse({ toggle: true});
		
		$('#collapseExample').on('shown.bs.collapse', function () {			
			my_collapse();	
	    })
	}
	
	/* Called to test collapse in the editor */   
	function my_collapse(){
		var limit;	
		var content;	
		var code_html=$("#mytextarea").val();
		var source_data=$("#source-data").val();
		/* Call Ajax with jQuery */	
		$.getJSON( source_data, function( json ) {     									    					
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						/* Limit json at limit elements */
						limit=$("#limit").val();
						var prop_arry=name_prop(code_html);					
						var new_json=json[prop_arry].slice(0,limit); 
						json[prop_arry]=new_json;					    	
					}
					content=Mustache.render(code_html,json);	
				    $("#collapseExampleWell").html(content);  				   					   
			});	/* End call Ajax */	
	}
	
	/* Make test component Accordion */
	function test_component_accordion(){	
		var toggle='';				
		$("#test-area").css({"background": "white"});
		accordion=options_tabs_accordion($("#mytextarea").val());  //array contained accordion
		var templ='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"> \n';
		accordion.forEach(function (tab,i){
			/* if (i==0) toggle=comp_accordion.toggle_accordion;
			   else toggle='';	 
			     not used because not fire event! 
			*/
			templ+=Mustache.render($('#tpl-accordion').html(),{collapsible_group_item: tab,num: i+''});
		});		
		templ+='</div> \n';
		/* Activate component */
		var c='<div style="height:auto;">';
		c+='<br/><br/> \n';
		c+=templ; 																		
		c+='</div> \n';				
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';		
		$("#test-area").html(c);
		console.log(c);
		$('#accordion').on("shown.bs.collapse", function (e) { my_accordion(e); });		
		if (comp_accordion.toggle_accordion==' in') {			
			$('#'+accordion[0]).collapse('show');
		}		
	}
	
	/* Called to test accordion in the editor */   
	function my_accordion(e){		
		var accord;
		var limit;
		//alert(e.target.id);		
		var item=e.target.id;
		var code_html=$("#mytextarea").val();
		var source_data=get_source_data_accordion(code_html,item);	
		/* Call Ajax with jQuery */	
		$.getJSON( source_data, function( json ) {     									    
					code_html=templ_target_accordion(item,code_html);		
					if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
						/* Limit json at limit elements */
						limit=$("#limit").val();
						var prop_arry=name_prop(code_html);					
						var new_json=json[prop_arry].slice(0,limit); 
						json[prop_arry]=new_json;		
						accord=Mustache.render(code_html,json);				    	
					}else{
						accord=Mustache.render(code_html,json);
				    }							
				    $("#"+item).html(accord);  				   					   
			});	/* End call Ajax */	
	}
	
	/* Return template for item - Accordion component */
	function templ_target_accordion(item,code_html){
	    var res = "{{!start_accordion#"+item+"}}([^]*){{!end_accordion#"+item+"}}";				
		var re = new RegExp(res);
		var found = code_html.match(re);			
		return found[1]+'';		
	}
	
	/* Return source-data of active tab - Accordion component */
	function get_source_data_accordion(code_html,item){		
		var re = /{{!url#([^]*)#}}/;
		var templ=templ_target_accordion(item,code_html);		
		var found=templ.match(re);
		return (found[1]+'');	
	}
	
	/* Return array options tabs - Accordion component */
	function options_tabs_accordion(tmpl){				
		var re = /{{!start_accordion#\w+}}/g;
		var found = tmpl.match(re);	        
		var cont;  
		re =/{{!start_accordion#([^]*)}}/;
		for(i=0; i<found.length; i++){
			cont=found[i].match(re);
			found[i]=cont[1];
		}					   
		return found;	
	}
	
	/* Make test component Carousel */
	function test_component_carousel(){	
		$("#test-area").css({"background": "white"});
		/* Activate component */
		var c='<div style="height:auto;">';
		c+='<br/><br/> \n';
		c+=Mustache.render($('#tpl-carousel').html(),{rKey:''}); 																		
		c+='</div> \n';	
		/* Insert custom CSS style */
		c+='<style type="text/css">';
		c+=$("#txt-css").val();
		c+='</style>';		
		$("#test-area").html(c);
		
		dataTestCarousel($("#source-data").val(),$("#limit").val(),'');   			
        $('#carousel').carousel({interval: comp_carousel.interval, wrap: comp_carousel.wrap, pause: comp_carousel.pause, keyboard:comp_carousel.keyboard });        
	}
	
	/* Test carousel - Loading data in sync mode Ajax */
	dataTestCarousel=function(url,limit,rKey) {	
		var prop_arry, new_json;
		var templ='';
		var user_templ;
		$.ajax({type: "GET",
			   url: url,
			   dataType: "json",
			   async:false,
			   success: function(json) {	
			        user_templ=$("#mytextarea").val();
					for(i=0;i<limit;i++){
						if(i==0) templ+='<li data-target="#carousel'+rKey+'" data-slide-to="0" class="active"></li> \n';
						else templ+='<li data-target="#carousel'+rKey+'" data-slide-to="'+i+'"></li> \n';
					}	
					$("#car-ind").html(templ);
					templ='';
					if(limit>0){   
					   prop_arry=name_prop(user_templ);	
					   new_json=json[prop_arry].slice(0,limit); 
					   json[prop_arry]=new_json;	
                       
					}
					user_templ=remove_name_object(user_templ,prop_arry);
					for(i=0;i<limit;i++){
						if(i==0) templ+='<div class="item active"> \n';
						else templ+='<div class="item"> \n';
						templ+=' <img src="'+json[prop_arry][i]['results']+'" alt="Image"> \n';
						templ+=' <div class="carousel-caption"> \n';
						templ+=Mustache.render(user_templ,json[prop_arry][i]);						
						templ+=' </div> \n';
						templ+='</div> \n';
					}										
					$("#car-inner").html(templ);  				  				   
		}})			
	}
	
	/* Remove {{#...}} from user template */
	function remove_name_object(user_templ,prop_arry){
		var re = "{{#"+prop_arry+"}}";
		user_templ = user_templ.replace(new RegExp(re),'');	   		
		return user_templ;	
	}
	
	/* Copy to clipboard css code for component */
	function copy_to_clip_css_component(){
		var c=$("#txt-css").val();		
		return c;
	}
	
	/* Copy to clipboard html code for tooltip */
	function copy_to_clip_html_tooltip(){
		var c='data-toggle="tooltip" '; 
		c+='data-template=\'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner tp_'+rKey+'" style="max-width:none; text-align:left;"></div></div>\' ';		    
		c+='id="tp-'+rKey+'"';	
		return c;
	}	
			
	/* Copy to clipboard html code for popover */
	function copy_to_clip_html_popover(){
		var c='data-toggle="popover" '; 		
		c+='data-template=\'<div class="popover" role="tooltip" style="max-width:none;"><div class="arrow"></div><h3 class="popover-title pp-title-'+rKey+'"></h3><div class="popover-content pp-content-'+rKey+'"></div></div>\' ';	
		c+='id="pop-'+rKey+'"';	
		return c;
	}

	/* Copy to clipboard html code for modal */
	function copy_to_clip_html_modal(){
		var templ=$("#tpl-modal").html();
		c=Mustache.render(templ,{size_modal: this.size_modal, fade_modal: this.fade_modal, whatever: this.whatever, rKey: rKey});		
		return c;
	}		
	
	/* Copy to clipboard html code for tabs */
	function copy_to_clip_html_tabs(){
		var tabs=options_tabs($("#mytextarea").val());  //array contained tabs
		var templ='<div id="myTabsTest-'+rKey+'"> \n';
		templ+='<!-- Nav tabs -->\n';
		templ+='<ul class="nav nav-'+comp_tabs.markup+'s" role="tablist">\n';
		tabs.forEach(function (tab,i){
			if (i==0) templ+='<li role="presentation" cclass="active"><a href="#'+tab+'" aria-controls="'+tab+'" role="tab" data-toggle="'+comp_tabs.markup+'">'+tab+'</a></li> \n';
			else templ+='<li role="presentation"><a href="#'+tab+'" aria-controls="'+tab+'" role="tab" data-toggle="'+comp_tabs.markup+'">'+tab+'</a></li> \n';
		});
		templ+='</ul> \n\n';
		templ+='<!-- Tab panes --> \n';
		templ+='<div class="tab-content"> \n';
		tabs.forEach(function (tab,i){
			if (i==0) templ+='<div role="tabpanel" class="tab-pane '+comp_tabs.fade+' in active" id="'+tab+'"></div> \n';
			else templ+='<div role="tabpanel" class="tab-pane '+comp_tabs.fade+'" id="'+tab+'"></div> \n';
		});
		templ+='</div> \n\n';
		templ+='</div> \n';				
		return templ;
	}	
	
	/* Copy to clipboard html code for alert */
	function copy_to_clip_html_alert(){
		var templ;
		if(comp_alert.close_alert) {
			templ='<div class="alert alert-'+comp_alert.type_alert+' alert-dismissible" id="my_alert_'+rKey+'" role="alert"> \n';	
			templ+='<button type="button" class="close" data-dismiss="aalert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \n';
		}else{
			templ='<div class="alert alert-'+comp_alert.type_alert+'" id="my_alert_'+rKey+'" role="alert"> \n';	
		}
		templ+='<div id="my_alert_content_'+rKey+'">Wait...</div> \n';
		templ+='</div> \n';	
		return templ;
	}
	
	/* Copy to clipboard html code for collapse */
	function copy_to_clip_html_collapse(){
		var templ;
		if(this.type_collapse=='button'){ 
		    templ='<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse-'+rKey+'" aria-expanded="false" aria-controls="collapseExample">\n';
			templ+='Button with data-target\n';
			templ+='</button>\n';
		}else{
		    templ='<a class="btn btn-primary" role="button" data-toggle="collapse" href="#collapse-'+rKey+'" aria-expanded="false" aria-controls="collapseExample">\n';
			templ+='Link with href\n';
			templ+='</a>\n';
		} 	
		templ+='<div class="collapse" id="collapse-'+rKey+'">\n';
		templ+='<div class="well" id="collapseWell-'+rKey+'">\n';
		templ+='Wait...\n';
		templ+='</div>\n';
		templ+='</div>\n';
		return templ;
	}
	
	/* Copy to clipboard html code for accordion */
	function copy_to_clip_html_accordion(){
		var toggle='';	
		accordion=options_tabs_accordion($("#mytextarea").val());  //array contained accordion
		var templ='<div class="panel-group" id="accordion'+rKey+'" role="tablist" aria-multiselectable="true"> \n';
		accordion.forEach(function (tab,i){
			templ+=Mustache.render($('#tpl-accordion').html(),{collapsible_group_item: tab,num: i+'',rKey: rKey});
		});		
		templ+='</div> \n';
		return templ;
	}
	
	/* Copy to clipboard html code for carousel */
	function copy_to_clip_html_carousel(){
		var toggle='';			
		var templ=Mustache.render($('#tpl-carousel').html(),{rKey: rKey}); 		
		return templ;
	}
	
	/* Copy to clipboard js code for tooltip */
	function copy_to_clip_js_tooltip(){
		var c;		
		/* Generate a js code */
		c='$(function() {';							
		c+='$("#tp-'+rKey+'").tooltip({title: my_title_'+rKey+', html:true, ';							
		c+='animation:'+this.opt_animation+', placement:"'+this.opt_placement+'", ';
		c+='delay: {show:'+this.opt_show+', hide:'+this.opt_hide+' }, trigger: "'+this.opt_trigger+'" ';
		c+='}); \n';							
		c+='})\n\n';
							
		c+='function my_title_'+rKey+'(){\n';							
		c+='var titolo=\'<div style="width: '+$("#c_width").html()+'px; height: '+$("#c_height").html()+'px;">Loading...</div>\';	/* Setting size */ \n';	
		c+='$.getJSON( "'+$("#source-data").val()+'", function( json ) { /* Call Ajax with jQuery */	\n';																					
		html=$("#mytextarea").val();	
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes') {
				var prop_arry=name_prop($("#mytextarea").val());
				c+='var new_json=json["'+prop_arry+'"].slice(0,'+$("#limit").val()+');\n'; 
				c+='json["'+prop_arry+'"]=new_json; \n';
		}
		c+='c_editor=\''+minifyHTML(html)+'\';\n';														
		c+='titolo=Mustache.render(c_editor,json);\n';	
		c+='$(".tp_'+rKey+'").html(titolo); \n';							
		c+='});	/* End call Ajax */	 \n';
		c+='return 	titolo;  //return Loading...\n';
		c+='} \n';	
		return c;	
	}
	
	/* Copy to clipboard js code for popover */
	function copy_to_clip_js_popover(){
		var c, content_prop, code_html;		
		/* Generate a js code */
		content_prop='<div style="width: '+$("#c_width").html()+'px; height: '+$("#c_height_content").html()+'px;">Wait...</div>';
		c='$(function() {';							
		c+='$("#pop-'+rKey+'").popover({content:\''+content_prop+'\', title: my_title_content_'+rKey+', html:true, ';							
		c+='animation:'+this.opt_animation+', placement:"'+this.opt_placement+'", ';
		c+='delay: {show:'+this.opt_show+', hide:'+this.opt_hide+' }, trigger: "'+this.opt_trigger+'" ';
		c+='}); \n';							
		c+='})\n\n';
							
		c+='function my_title_content_'+rKey+'(){\n';							
		c+='var titolo=\'<div style="width: '+$("#c_width").html()+'px; height: '+$("#c_height_title").html()+'px;">Loading...</div>\';	/* Setting size */ \n';	
		c+='var cont=\'\'; \n';
		c+='$.getJSON( "'+$("#source-data").val()+'", function( json ) { /* Call Ajax with jQuery */	\n';																					
		code_html=$("#mytextarea").val();	
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes') {			
			/* Limit json at limit elements */
			var prop_arry=name_prop(content(code_html));					
			c+='var new_json=json["'+prop_arry+'"].slice(0,'+$("#limit").val()+');\n'; 
			c+='json["'+prop_arry+'"]=new_json; \n';
			c+='cont=\''+minifyHTML(content(code_html))+'\';\n';														
		    c+='cont=Mustache.render(cont,json);\n';
			/* Limit json at 1 element */								
			c+='new_json=json["'+prop_arry+'"].slice(0,1); \n'; 
			c+='json["'+prop_arry+'"]=new_json; \n';
			c+='titolo=\''+minifyHTML(title(code_html))+'\';\n';														
		    c+='titolo=Mustache.render(titolo,json);\n';						
		}else{			
			c+='titolo=\''+minifyHTML(title(code_html))+'\';\n';	
			c+='titolo=Mustache.render(titolo,json);\n';
			c+='cont=\''+minifyHTML(content(code_html))+'\';\n';	
			c+='cont=Mustache.render(cont,json);\n'; 
		}																	
		c+='$(".pp-title-'+rKey+'").html(titolo); \n';	
		c+='$(".pp-content-'+rKey+'").html(cont); \n';			
		c+='});	/* End call Ajax */	 \n';
		c+='return 	titolo;  //return Loading...\n';
		c+='} \n';	
		return c;	
	}
	
	/* Copy to clipboard js code for modal */
	function copy_to_clip_js_modal(){
		var c, code_html;		
		/* Generate a js code */		
		var backdrop_=(this.opt_backdrop=='true');		
		var keyboard_=(this.opt_keyboard=='true');		
		var show_=(this.opt_show=='true');
		c='$("#myModalTest'+rKey+'").on("shown.bs.modal", function (e) { my_modal_'+rKey+'(e); }); \n';
		c+='$("#myModalTest'+rKey+'").modal({backdrop: '+backdrop_+', keyboard: '+keyboard_+', show: '+show_+'}); \n';	
										
		c+='function my_modal_'+rKey+'(e){\n';							
		c+='var button = $(e.relatedTarget);\n';
		c+='var labl = button.data(\'whatever\'); \n';
		c+='var myModalLabel="#myModalLabelTest'+rKey+'"; \n';
		c+='var	myModalBody="#myModalBodyTest'+rKey+'"; \n';
		c+='$.getJSON( "'+$("#source-data").val()+'", function( json ) { /* Call Ajax with jQuery */	\n';																					
		code_html=$("#mytextarea").val();			
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes') {			
			/* Limit json at limit elements */
			var prop_arry=name_prop(content(code_html));					
			c+='var new_json=json["'+prop_arry+'"].slice(0,'+$("#limit").val()+');\n'; 
			c+='json["'+prop_arry+'"]=new_json; \n';
			c+='cont=\''+minifyHTML(content(code_html))+'\';\n';	
			c+='cont=modal_data_whatever(cont,labl); \n';	
		    c+='cont=Mustache.render(cont,json);\n';
			/* Limit json at 1 element */								
			c+='new_json=json["'+prop_arry+'"].slice(0,1); \n'; 
			c+='json["'+prop_arry+'"]=new_json; \n';
			c+='titolo=\''+minifyHTML(title(code_html))+'\';\n';
			c+='titolo=modal_data_whatever(titolo,labl); \n';	
		    c+='titolo=Mustache.render(titolo,json);\n';						
		}else{			
			c+='titolo=\''+minifyHTML(title(code_html))+'\';\n';
			c+='titolo=modal_data_whatever(titolo,labl); \n';	
			c+='titolo=Mustache.render(titolo,json);\n';
			c+='cont=\''+minifyHTML(content(code_html))+'\';\n';	
			c+='cont=modal_data_whatever(cont,labl); \n';
			c+='cont=Mustache.render(cont,json);\n'; 
		}				
		c+='$(myModalLabel).html(titolo);  \n';	
		c+='$(myModalBody).html(cont); \n';			
		c+='});	/* End call Ajax */	 \n';
		c+='} \n';	
		
		c+='/* Modal: manage {{!data-whatever}} in template */ \n';
		c+='function modal_data_whatever(code_html,data_whatever){	\n';
		c+='var re = /{{!data-whatever}}/g; \n';
		c+='code_html=code_html.replace(re,data_whatever); \n';
		c+='return code_html; \n';
		c+='} \n';
		return c;	
	}	
	
	/* Copy to clipboard js code for tabs */
	function copy_to_clip_js_tabs(){
		var c, code_html;		
		/* Generate a js code */	
        c='/**************************************Generated code for tabs start***************************************/\n'; 		
		if(comp_tabs.markup=='tab') c+='$(\'#myTabsTest-'+rKey+' a[data-toggle="tab"]\').on("shown.bs.tab", function (e) { my_tabs_'+rKey+'(e); })\n\n';
		else c+='$(\'#myTabsTest-'+rKey+' a[data-toggle="pill"]\').on("shown.bs.tab", function (e) { my_tabs_'+rKey+'(e); })\n\n';	
		
		c+='function my_tabs_'+rKey+'(e){\n';
		c+='var tab;\n';
		c+='var limit;\n';
		c+='var re = /#([^]*)/; \n';
		c+='var etarget=e.target+""; \n';
		c+='var found = etarget.match(re);\n';
		c+='var item=found[1]+"";\n';
		c+='var code_html=\''+minifyHTML($("#mytextarea").val())+'\'; \n';
		c+='var source_data=get_source_data_tab(code_html,item);\n';
		c+='/* Call Ajax with jQuery */	\n';
		c+='$.getJSON( source_data, function( json ) { \n';
		c+='code_html=templ_target(item,code_html);	\n';
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
			/* Limit json at limit elements */;
			c+='limit='+$("#limit").val()+';\n';
			c+='var prop_arry=name_prop(code_html);	\n';
			c+='var new_json=json[prop_arry].slice(0,limit); \n';
			c+='json[prop_arry]=new_json; \n';
			c+='tab=Mustache.render(code_html,json);\n';
		}else{
			c+='tab=Mustache.render(code_html,json);\n';
		}
		c+='$("#"+item).html(tab); \n';
		c+='});	/* End call Ajax */	\n';
		c+='}\n';		
		/*  Add functions */
		c+='/* Return string name property */ \n';
		c+='function name_prop(tmpl){ \n';
		c+='var re = /{{#\\w+}}/; \n';
		c+='var found = tmpl.match(re)+""; \n';
		c+='re=/\\w+/; \n';
		c+='var name=found.match(re)+""; \n';
		c+='return name; \n';
		c+='} \n';
		c+='/* Return source-data of active tab */ \n';
		c+='function get_source_data_tab(code_html,item){ \n';
		c+='var re = /{{!url#([^]*)#}}/; \n';
		c+='var templ=templ_target(item,code_html);	\n';
		c+='var found=templ.match(re); \n';
		c+='return (found[1]+""); \n';
		c+='} \n';
		c+='/* Return template for item */ \n';
		c+='function templ_target(item,code_html){ \n';
		c+='var res = "{{!start_tab#"+item+"}}([^]*){{!end_tab#"+item+"}}";	\n';
		c+='var re = new RegExp(res); \n';
		c+='var found = code_html.match(re); \n';
		c+='return found[1]+""; \n';
		c+='} \n';	
		c+='$(\'#myTabsTest-'+rKey+' a[href=#'+tabs[0]+']\').tab(\'show\'); \n';	//Visual active tab		
		c+='/**************************************Generated code for tabs end***************************************/\n'; 									
		return c;	
	}	
	
	/* Copy to clipboard js code for alert */
	function copy_to_clip_js_alert(){
		var c, code_html;
        var limit=0;		
		/* Generate a js code */	
        c='/**************************************Generated code for alert start***************************************/\n'; 
		c+='$("#my_alert_'+rKey+'").hide();\n';
		c+='$("#my_alert_'+rKey+' span").click(function(){ $("#my_alert_'+rKey+'").hide(); });\n\n';
		c+='/* Defined to do Ajax call */ \n';   
		c+='function my_alert_'+rKey+'(){ \n';
		c+='var limit;	\n';
		c+='var content; \n';
		c+='var code_html=\''+minifyHTML($("#mytextarea").val())+'\';\n';
		c+='/* Call Ajax with jQuery */	 \n';
		c+='$.getJSON( \''+$("#source-data").val()+'\', function( json ) {   \n';
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
			c+='/* Limit json at limit elements */ \n';
			limit=$("#limit").val();
			c+='var prop_arry=name_prop(code_html);	\n';
			c+='var new_json=json[prop_arry].slice(0,'+limit+'); \n';
			c+='json[prop_arry]=new_json; \n';
		};
		c+='content=Mustache.render(code_html,json); \n';
		c+='$("#my_alert_content_'+rKey+'").html(content); \n';
		c+='});	/* End call Ajax */	 \n';
		c+='} \n';
		/*  Add functions */
		if(limit!=0){
			c+='/* Return string name property */ \n';
			c+='function name_prop(tmpl){ \n';
			c+='var re = /{{#\\w+}}/; \n';
			c+='var found = tmpl.match(re)+""; \n';
			c+='re=/\\w+/; \n';
			c+='var name=found.match(re)+""; \n';
			c+='return name; \n';
			c+='} \n\n';
		}
		
		c+='/*------------------------------------------------------------\n';
		c+='Utilize this javascript instructions to visualize the Alert!\n';
		c+='Write it in right location!\n';
		c+='	$(\'#my_alert_'+rKey+'\').show(); \n';
		c+='	my_alert_'+rKey+'(); \n';
		c+='----------------------------------------------------------*\\n\n';
		c+='/**************************************Generated code for alert end***************************************/\n'; 									
		return c;	
	}	
	
	/* Copy to clipboard js code for collapse */
	function copy_to_clip_js_collapse(){
		var c, code_html;
        var limit=0;		
		/* Generate a js code */	
        c='/**************************************Generated code for collapse start***************************************/\n'; 		
		c+='$("#collapse-'+rKey+'").on("shown.bs.collapse", function () { \n';
		c+='		my_collapse_'+rKey+'(); \n';
		c+='})\n';
		if (comp_collapse.toggle_collapse) c+='$(\'#collapse-'+rKey+'\').collapse({ toggle: true});\n';
		c+='/* Defined to do Ajax call */ \n';   
		c+='function my_collapse_'+rKey+'(){ \n';
		c+='var limit;	\n';
		c+='var content; \n';
		c+='var code_html=\''+minifyHTML($("#mytextarea").val())+'\';\n';
		c+='/* Call Ajax with jQuery */	 \n';
		c+='$.getJSON( \''+$("#source-data").val()+'\', function( json ) {   \n';
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
			c+='/* Limit json at limit elements */ \n';
			limit=$("#limit").val();
			c+='var prop_arry=name_prop(code_html);	\n';
			c+='var new_json=json[prop_arry].slice(0,'+limit+'); \n';
			c+='json[prop_arry]=new_json; \n';
		};
		c+='content=Mustache.render(code_html,json); \n';
		c+='$("#collapseWell-'+rKey+'").html(content); \n';
		c+='});	/* End call Ajax */	 \n';
		c+='} \n';
		/*  Add functions */
		if(limit!=0){
			c+='/* Return string name property */ \n';
			c+='function name_prop(tmpl){ \n';
			c+='var re = /{{#\\w+}}/; \n';
			c+='var found = tmpl.match(re)+""; \n';
			c+='re=/\\w+/; \n';
			c+='var name=found.match(re)+""; \n';
			c+='return name; \n';
			c+='} \n\n';
		}		
		c+='/**************************************Generated code for collapse end***************************************/\n'; 									
		return c;	
	}
	
	/* Copy to clipboard js code for accordion */
	function copy_to_clip_js_accordion(){
		var c, code_html;
        var limit=0;		
		/* Generate a js code */	
        c='/**************************************Generated code for accordion start***************************************/\n'; 
		c+='$(\'#accordion'+rKey+'\').on("shown.bs.collapse", function (e) { my_accordion_'+rKey+'(e); });\n\n';
		if (comp_accordion.toggle_accordion==' in') {			
			c+='$("#'+accordion[0]+'").collapse(\'show\'); \n\n';
		}	
		c+='function my_accordion_'+rKey+'(e){\n';
		c+='var accord; \n';
		c+='var item=e.target.id; \n';
		c+='var code_html=\''+minifyHTML($("#mytextarea").val())+'\'; \n';
		c+='var source_data=get_source_data_accordion(code_html,item); \n';
		c+='/* Call Ajax with jQuery */	\n';
		c+='$.getJSON( source_data, function( json ) { \n';
		c+='code_html=templ_target_accordion(item,code_html); \n';
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
			/* Limit json at limit elements */;
			c+='limit='+$("#limit").val()+';\n';
			c+='var prop_arry=name_prop(code_html);	\n';
			c+='var new_json=json[prop_arry].slice(0,limit); \n';
			c+='json[prop_arry]=new_json; \n';
			c+='accord=Mustache.render(code_html,json);\n';
		}else{
			c+='accord=Mustache.render(code_html,json);\n';
		}
		c+='$("#"+item).html(accord); \n';
		c+='});	/* End call Ajax */	\n';
		c+='}\n';		
		/*  Add functions */
		c+='/* Return string name property */ \n';
		c+='function name_prop(tmpl){ \n';
		c+='var re = /{{#\\w+}}/; \n';
		c+='var found = tmpl.match(re)+""; \n';
		c+='re=/\\w+/; \n';
		c+='var name=found.match(re)+""; \n';
		c+='return name; \n';
		c+='} \n';
		c+='/* Return template for item - Accordion component */ \n';
		c+='function templ_target_accordion(item,code_html){ \n';
		c+='var res = "{{!start_accordion#"+item+"}}([^]*){{!end_accordion#"+item+"}}";	\n';
		c+='var re = new RegExp(res); \n';
		c+='var found = code_html.match(re);\n';
		c+='return found[1]+""; \n';
		c+='} \n';
		c+='/* Return source-data of active link */ \n';
		c+='function get_source_data_accordion(code_html,item){ \n';
		c+='var re = /{{!url#([^]*)#}}/; \n';
		c+='var templ=templ_target_accordion(item,code_html); \n';
		c+='var found=templ.match(re); \n';
		c+='return (found[1]+""); \n';
		c+='} \n';		
		c+='/**************************************Generated code for accordion end***************************************/\n'; 									
		return c;	
	}
	
	/* Copy to clipboard js code for carousel */
	function copy_to_clip_js_carousel(){
		var c;
        var limit=$("#limit").val();
         		
		/* Generate a js code */	
        c='/**************************************Generated code for carousel start***************************************/\n'; 
		c+='function my_carousel_'+rKey+'(){\n';
		c+='var templ=""; \n';
		c+='var user_templ=\''+minifyHTML($("#mytextarea").val())+'\'; \n';
		c+='var source_data="'+$("#source-data").val()+'"; \n';
		c+='/* Call Ajax with jQuery */	\n';
		c+='$.getJSON( source_data, function( json ) { \n';
		if ($('input:radio[name=inlineRadioOptions]:checked').val()=='yes'){ 
		    c+='limit='+$("#limit").val()+';\n';
		    c+='for(i=0;i<limit;i++){  \n';
			c+='	if(i==0) templ+=\'<li data-target="#carousel'+rKey+'" data-slide-to="0" class="active"></li>\'; \n';
			c+='	else templ+=\'<li data-target="#carousel'+rKey+'" data-slide-to="'+i+'"></li>\'; \n';
			c+='} \n';	
			c+='$("#car-ind'+rKey+'").html(templ); \n';
			c+='templ=""; \n';	
			/* Limit json at limit elements */;			
			c+='var prop_arry=name_prop(user_templ);	\n';
			c+='var new_json=json[prop_arry].slice(0,limit); \n';
			c+='json[prop_arry]=new_json; \n';
			c+='user_templ=remove_name_object(user_templ,prop_arry); \n';
			c+='for(i=0;i<limit;i++){ \n';
			c+='	if(i==0) templ+=\'<div class="item active">\'; \n';
			c+='	else templ+=\'<div class="item">\'; \n';
			c+='	templ+=\' <img src="\'+json[prop_arry][i]["results"]+\'" alt="Image">\'; \n';
			c+='	templ+=\' <div class="carousel-caption">\'; \n';
			c+='	templ+=Mustache.render(user_templ,json[prop_arry][i]); \n';						
			c+='	templ+=\' </div>\'; \n';
			c+='	templ+=\'</div>\'; \n';
			c+='} \n';				
		}
		c+='$("#car-inner'+rKey+'").html(templ); \n';
		c+='});	/* End call Ajax */	\n';
		c+='}\n';	
		c+='$("#carousel'+rKey+'").carousel({interval:'+comp_carousel.interval+', wrap: '+comp_carousel.wrap+', pause: "'+comp_carousel.pause+'", keyboard:'+comp_carousel.keyboard+' }); \n';        
		c+='my_carousel_'+rKey+'(); \n';
		/*  Add functions */
		c+='/* Return string name property */ \n';
		c+='function name_prop(tmpl){ \n';
		c+='var re = /{{#\\w+}}/; \n';
		c+='var found = tmpl.match(re)+""; \n';
		c+='re=/\\w+/; \n';
		c+='var name=found.match(re)+""; \n';
		c+='return name; \n';
		c+='} \n';
		c+='/* Remove {{#...}} from user template */ \n';
		c+='function remove_name_object(user_templ,prop_arry){  \n';
		c+='var re = "{{#"+prop_arry+"}}";  \n';
		c+='user_templ = user_templ.replace(new RegExp(re),"");	 \n';
		c+='return user_templ;	\n';
		c+='} \n';
		c+='/**************************************Generated code for carousel end***************************************/\n'; 									
		return c;	
	}