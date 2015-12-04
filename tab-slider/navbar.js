$svjq.fn.navbarSelected = function(){   
   var scroll = this;
   var value = $svjq(scroll).children('.filter.active').html();      
   $svjq(scroll).siblings('.scroll-selected').html(value);   
}
$svjq.fn.navbar = function() {
   var scroll = this;
   //define class
   var _class = {
      outter    : 'scroll-container',
      crop      : 'scroll-crop',
      inner     : 'scroll',
      selected  : 'scroll-selected',
      left      : 'scroll-left',
      right     : 'scroll-right',      
      active    : 'active'
   }
   //create dom
   var container = $svjq("<div>", {class: _class.outter});
   var crop = $svjq("<div>", {class: _class.crop});
   var selected = $svjq("<div>", {class: _class.selected});   
   var leftArrow = $svjq("<i>", {class: _class.left});
   var rightArrow = $svjq("<i>", {class: _class.right});   
   scroll.addClass(_class.inner);
   //manupulate dom   
   container.insertBefore(scroll);
   container.append(leftArrow);
   container.append(rightArrow);
   container.append(crop);   
   crop.append(selected);
   crop.append(scroll);   
   //add event dom
   rightArrow.click(function(evt){      
      evt.stopPropagation();
      if (!crop.isOverFlowRight(scroll)) return;      
      marginLeft-=Math.min(crop.spaceRight(scroll),crop.width());
      transition();
   });
   leftArrow.click(function(evt){      
      evt.stopPropagation();      
      if (!crop.isOverFlowLeft(scroll)) return;
      marginLeft+= Math.min(crop.spaceLeft(scroll),crop.width());
      transition();
   });
   selected.click(function(evt){
      evt.stopPropagation();      
      toggleScroll();
   });
   scroll.children().click(function(evt){
      if (scroll.hasClass(_class.active)) toggleScroll();//just close if open      
      var obj = $svjq(evt.target);      
      selected.html(obj.html());
      if (crop.isOverFlowLeft(obj)) {
         console.log(crop.spaceLeft(obj));
         marginLeft+= crop.spaceLeft(obj);
      }
      console.log($svjq(crop).posRight() + " < " + $svjq(obj).posRight() + " ? ");      
      if (crop.isOverFlowRight(obj)) {
         console.log(crop.spaceRight(obj));
         $svjq(this).posRight() < $svjq(obj).posRight();   
         marginLeft-=crop.spaceRight(obj);
      }
      transition();
   });
   //add checking
   var marginLeft = 0; //range : min -> 0   
   var transition = function() {      
      scroll.css('margin-left',marginLeft+'px');      
      checkOverFlow();      
   }
   var trimRight = function(){
      if (crop.isRightStretch(scroll)){
         var tmp = marginLeft+crop.spaceRight(scroll);
         marginLeft= tmp > 0 ? 0 : tmp;
         transition();          
      }
   }
   var toggleScroll = function(){
      scroll.slideToggle("fast",function(){
         scroll.css('display','');//remove inline style display
         scroll.toggleClass(_class.active);
      }); 
   }
   var checkOverFlow = function () {
      setTimeout(function(){
         container.removeClass(_class.active);
         leftArrow.removeClass(_class.active);
         rightArrow.removeClass(_class.active);
         if (crop.isOverFlow(scroll)) container.addClass(_class.active);
         if (crop.isOverFlowLeft(scroll)) leftArrow.addClass(_class.active); 
         if (crop.isOverFlowRight(scroll)) rightArrow.addClass(_class.active);
      }, 500);//wait for screen render completed
   }
   checkOverFlow();   
   var resizeEnd;
   $(window).bind('resize', function(e) {
       clearTimeout(resizeEnd);
       resizeEnd = setTimeout(function() {           
           trimRight();
           checkOverFlow();
       }, 100);
   });   
};
$svjq.fn.isOverFlow = function(e) {      
   return $svjq(this).isOverFlowLeft(e) || $svjq(this).isOverFlowRight(e);
}
$svjq.fn.isOverFlowLeft = function(e) {   
   return $svjq(this).posLeft() > $svjq(e).posLeft();
}
$svjq.fn.isOverFlowRight = function(e) {
   return $svjq(this).posRight() < $svjq(e).posRight();   
}
$svjq.fn.isRightStretch = function(e) {
   return $svjq(this).isOverFlowLeft(e) && ($svjq(this).posRight() > $svjq(e).posRight());
}
$svjq.fn.posLeft = function(){
   return $svjq(this).offset().left;
}
$svjq.fn.posRight = function(){
   return $svjq(this).offset().left + $svjq(this).outerWidth();
}
$svjq.fn.spaceLeft = function(e){
   return Math.abs($svjq(this).posLeft() - $svjq(e).posLeft());
}
$svjq.fn.spaceRight = function(e){
   return Math.abs($svjq(this).posRight() - $svjq(e).posRight());
}