/**
 * Created by zjt on 2016/10/2.
 */

forexApp.directive('strategyForm',function(){
     return {
         restrict:'E',
         templateUrl:'./directives/strategyForm/strategyForm.html',
         link:function(scope){
             scope.name='text';
         }
     };
});
