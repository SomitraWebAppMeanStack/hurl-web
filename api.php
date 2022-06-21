<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Admin\CityController;
use App\Http\Controllers\API\Admin\CountryController;
use App\Http\Controllers\API\Admin\MenuController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\LogoutController;
use App\Http\Controllers\API\User\UserController;


use App\Http\Controllers\API\OTPController;
use App\Http\Controllers\API\ForgetPassword;
use App\Http\Controllers\API\Admin\RestaurantController;

use App\Http\Controllers\API\Admin\PromotionController;
use App\Http\Controllers\API\Admin\PromoCodeController;


use App\Http\Controllers\API\Driver\DriverController;

use App\Http\Controllers\API\Restaurant\Registration\RegistrationController;
use App\Http\Controllers\API\Restaurant\StaffTypeController;
use App\Http\Controllers\API\Restaurant\BranchController;
use App\Http\Controllers\TwilioSMSController;
use App\Http\Controllers\API\Restaurant\StaffController;

use App\Http\Controllers\API\Restaurant\DishManagement\DishController;
use App\Http\Controllers\API\Restaurant\DishManagement\ComboDishController;
use App\Http\Controllers\API\Restaurant\DishManagement\IngredientController;



use App\Events\BranchStaffEvent;







// For Restaurant Register 
Route::post('/RestroRegistration',[RegistrationController::class, 'store']);



// For Admin Login 
Route::post('/Adminlogin',[LoginController::class, 'adminlogin']);



// For Branch Login 
Route::post('/BranchLogin',[LoginController::class, 'branchLogin']);

// For Restaurant First Time Login 
Route::post('/RestaurantFirstLogin',[LoginController::class, 'restaurantFirstLogin']);


// Route::post('/restlogin',[RegisterController::class, 'Restaurantlogin']);

// For Logout 
Route::post('/logOut',[LogoutController::class, 'logOut']);

// For OTP 
Route::post('/SendOtp',[OTPController::class, 'sendOtp']);
Route::post('/VerifyOtp',[OTPController::class, 'verifyOtp']);

// For ForgetPassword 
Route::post('/ForgetOtp',[ForgetPassword::class, 'forgetOtp']);

Route::post('/VerifyForgetOtp',[ForgetPassword::class, 'verifyForgetOtp']);

Route::post('/ChangePwd',[ForgetPassword::class, 'changePwd']);



Route::post('/getCity',[CityController::class, 'getCity']);


Route::get('event-test',function(){
    $data = [
        'test' => 'hello'
    ];
     broadcast(new BranchStaffEvent('1',$data));
});





// Admin Section 

        // Start Fare Management 

            //For Show List
        Route::get('/FareList',[App\Http\Controllers\API\Admin\FareController::class, 'fareList']);
        Route::get('/BaseFareList',[App\Http\Controllers\API\Admin\FareController::class, 'baseFareList']);
        Route::get('/SurgeFareList',[App\Http\Controllers\API\Admin\FareController::class, 'surgeFareList']);
        Route::get('/SpecialFareList',[App\Http\Controllers\API\Admin\FareController::class, 'specialFareList']);

            //For Store 
        Route::post('/BaseFareStore',[App\Http\Controllers\API\Admin\FareController::class, 'baseFareStore']);
        Route::post('/SurgeFareStore',[App\Http\Controllers\API\Admin\FareController::class, 'surgeFareStore']);
        Route::post('/SpecialFareStore',[App\Http\Controllers\API\Admin\FareController::class, 'specialFareStore']);

            // For Status Change
        Route::post('/FareStatus',[App\Http\Controllers\API\Admin\FareController::class, 'chageSpecialStatus']);

            // For Delete
        Route::post('/SurgeDelete',[App\Http\Controllers\API\Admin\FareController::class, 'surgeDelete']);
        Route::post('/BaseDelete',[App\Http\Controllers\API\Admin\FareController::class, 'baseDelete']);


        // End Fare Management

        // For Banner Management

            // For Admin Requirnment
            Route::get('/AdminBannerList',[App\Http\Controllers\API\Admin\BannerController::class, 'index']);
            Route::get('/ApprovedBannerList',[App\Http\Controllers\API\Admin\BannerController::class, 'ApproveIndex']);
            Route::post('/StoreBanner',[App\Http\Controllers\API\Admin\BannerController::class, 'store']);

                // For Change Status of Banner
            Route::post('/ChangeStatus',[App\Http\Controllers\API\Admin\BannerController::class, 'changeStatus']);

            //For Restaurant Requirnment

            Route::post('/BannerList',[App\Http\Controllers\API\Restaurant\Banners\BannerController::class, 'index']);

            Route::post('/StoreRestroBanner',[App\Http\Controllers\API\Restaurant\Banners\BannerController::class, 'store']);


        // End Banner Management

        // For Branch List 

        Route::get('/AdminBranchList',[RestaurantController::class, 'branchList']);

        //For Branch List According Restaurant 
        Route::post('/BranchGet',[RestaurantController::class, 'GetBranch']);

        // For Branch Status
        Route::post('/BranchStatus',[RestaurantController::class, 'UpdateBranchStatus']);
        //   For Driver List 

        Route::get('/AdminDriverList',[DriverController::class, 'index']);

        // For Driver Status

        Route::post('/driverApprove',[DriverController::class, 'statusDriverApprove']);
        Route::post('/driverReject',[DriverController::class, 'statuDriverReject']);

        // For Driver Details 

        Route::post('/driverDetail',[DriverController::class, 'driverDetail']);

        //   For User List 

        Route::get('/AdminUserList',[UserController::class, 'index']);

        // For User Status 

        Route::post('/UserApprove',[UserController::class, 'statusApprove']);
        Route::post('/UserReject',[UserController::class, 'statusReject']);


    // Route::group(['middleware' => ['auth:api']], function () {
    // For Master Module
        Route::apiResources([
            'country' => CountryController::class,
            'city' => CityController::class,
            'menu' => MenuController::class,
            'category' => CategoryController::class,
            'restaurant' => RestaurantController::class,
            'branch' => BranchController::class,
            'staffType' => StaffTypeController::class,
            'staff' => StaffController::class,
            'Dish' => DishController::class,
            'ComboDish' => ComboDishController::class,
            'Ingredient' => IngredientController::class,
            'Promotion' => PromotionController::class,
        ]);

        // For Category 
        Route::post('/CatDelete',[CategoryController::class, 'destroy']);

        Route::post('/Edit',[CategoryController::class, 'edit']);

        Route::post('/UpdateCategory',[CategoryController::class, 'update']);

        // For Menu 

        Route::post('/MenuDelete',[CategoryController::class, 'destroy']);

        // Route::post('/Edit',[CategoryController::class, 'edit']);

        // Route::post('/UpdateCategory',[CategoryController::class, 'update']);



        Route::post('/branchList',[BranchController::class, 'list']);
        Route::post('/staffTypeList',[StaffTypeController::class, 'list']);
        Route::post('/staffList',[StaffController::class, 'list']);

        // For Restaurant Status 

        Route::post('/UpdateRestaurantStatus',[RestaurantController::class, 'UpdateRestaurantStatus']);
        
        // For Restaurant Details 

        Route::post('/restroDetail',[RestaurantController::class, 'restroDetail']);


        // For Active and Deactive User 
        Route::post('/onlineStatus',[LoginController::class, 'onlineStatus']);
        
        Route::post('/sendSMS', [TwilioSMSController::class, 'index']);


        // For PromoCode Management 
        Route::post('/PromoCode',[PromoCodeController::class, 'promoCode']);


        Route::post('/PromoCodeDelivery',[PromoCodeController::class, 'DelioveryBoyStore']);
        Route::get('/PromoCodeDeliveryList',[PromoCodeController::class, 'ShowDelivery']);
        Route::post('/PromoCodeSpendMore',[PromoCodeController::class, 'SpendMoreEarnStore']);
        Route::post('/PromoCodeSpendMoreList',[PromoCodeController::class, 'ShowMoreEarn']);
        Route::post('/PromoCodeGiveDiscount',[PromoCodeController::class, 'GiveDiscountStore']);
        Route::post('/PromoCodeGiveDiscountList',[PromoCodeController::class, 'ShowGiveDiscount']);

        // For  Promotion Controller

        Route::get('/PromotionSpendMoreList',[PromotionController::class, 'ShowMoreEarn']);
        Route::get('/PromotionGiveDiscountList',[PromotionController::class, 'ShowGiveDiscount']);

        Route::post('/SpendMorePromotion',[PromotionController::class, 'storeSpendMore']);

        // For Dish Controller  
        Route::post('/DishData',[DishController::class, 'DishList']);
        Route::post('/UpdateStatus',[DishController::class, 'UpdateStatus']);
        Route::post('/ApprovedDish',[DishController::class, 'ApprovedDishList']);
        Route::post('/PendingDish',[DishController::class, 'PendingDishList']);
        Route::post('/RejectedDish',[DishController::class, 'RejectedDishList']);


        // For Combo Dish Controller 
        Route::post('/UpdateComboStatus',[ComboDishController::class, 'UpdateStatus']);

        // For Ingredient Controller 
            // Ingredient List For Restaurant  
            Route::post('/IngredientRestroList',[IngredientController::class, 'restroList']);

            Route::post('/UpdateIngredientStatus',[IngredientController::class, 'updateStatus']);

        // For Reject Reason Controller 
            Route::get('/RejectReasonList',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'index']);
            Route::get('/RejectReasonDriverList',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'Driverindex']);
            Route::get('/RejectReasonRestaurantList',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'Restaurantindex']);
            Route::get('/RejectReasonUserList',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'Userindex']);
            Route::post('/RejectReason',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'store']);
            Route::post('/RejectReasonDelete',[App\Http\Controllers\API\Admin\RejectReasonController::class, 'delete']);


    // });



    // For Dish List According to NearBy Branch

    Route::post('/NearBy',[BranchController::class, 'nearby']);


    // For Support Management 

    Route::get('/Support',[App\Http\Controllers\API\Admin\SupportManagement::class, 'index']);
    Route::post('/StoreSupport',[App\Http\Controllers\API\Admin\SupportManagement::class, 'store']);
    Route::post('/UpdateSupport',[App\Http\Controllers\API\Admin\SupportManagement::class, 'update']);
    Route::post('/DeleteSupport',[App\Http\Controllers\API\Admin\SupportManagement::class, 'delete']);


    // For Subscription Management 

    Route::get('/Subscription',[App\Http\Controllers\API\Admin\SubscriptionController::class, 'index']);
    Route::post('/StoreSubscription',[App\Http\Controllers\API\Admin\SubscriptionController::class, 'store']);
    Route::post('/UpdateSubscription',[App\Http\Controllers\API\Admin\SubscriptionController::class, 'update']);
    Route::post('/DeleteSubscription',[App\Http\Controllers\API\Admin\SubscriptionController::class, 'delete']);


// End Admin Section










// For User

    // For User Register 
    Route::post('/register',[App\Http\Controllers\API\User\RegisterController::class, 'register']);

    // For User Login 
    Route::post('/login',[App\Http\Controllers\API\User\LoginController::class, 'login']);

    Route::post('/UserAddressStore',[App\Http\Controllers\API\User\UserController::class, 'address']);
    Route::post('/UserAddressList',[App\Http\Controllers\API\User\UserController::class, 'addressList']);

    // For OTP 
    
    Route::post('/UserSendOtp',[App\Http\Controllers\API\User\OtpController::class, 'sendOtp']);
    Route::post('/UserSendForgetOtp',[App\Http\Controllers\API\User\OtpController::class, 'forgetSendOtp']);
    Route::post('/UserVerifyOtp',[App\Http\Controllers\API\User\OtpController::class, 'verifyOtp']);
    
// End User




// For Restaurant Section

        // For Menu and Category List 
        Route::post('/RestroMenuList',[App\Http\Controllers\API\Restaurant\MenuCategory\MenuCategoryController::class, 'menuList']);
        Route::post('/RestroCategoryList',[App\Http\Controllers\API\Restaurant\MenuCategory\MenuCategoryController::class, 'categoryList']);

    // For Dish Management Controller

        // Dish Data List According Menu

        Route::post('/RestroMenuDish',[DishController::class, 'MenuDish']);

        // Dish Data List According Category

        Route::post('/RestroCategoryDish',[DishController::class, 'CategoryDish']);

        // Conbo Dish Data List According Menu

        Route::post('/RestroMenuComboDish',[ComboDishController::class, 'MenuCombo']);

        // Conbo Dish Data List According Category

        Route::post('/RestroCategoryComboDish',[ComboDishController::class, 'CategoryCombo']);


        // For Order Management Controller

        Route::post('/OrderData',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'orderData']);

        // For All Order 

        Route::post('/OrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'orderList']);

        // For Pending Order 

        Route::post('/PendingOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'pendingOrderList']);

        // For Accept Order
        Route::post('/ChangePendingOrder',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'changePendingOrderStatus']);

        // For Rejecting Order
        Route::post('/RejectOrder',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'rejectOrder']);

        // For Packing Order 

        Route::post('/PackingOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'packingOrderList']);

        Route::post('/ChangePackingOrder',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'changePackingOrderStatus']);

        // For Delay Order
        Route::post('/DelayOrder',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'delayOrder']);

        // For Ready Order 

        Route::post('/ReadyOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'readyOrderList']);

        // For Ongoing Order 

        Route::post('/OngoingOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'ongoingOrderList']);

        // For Reject Order 

        Route::post('/RejectOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'rejectOrderList']);

        // For Delayed Order 

        Route::post('/DelayedOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'delayedOrderList']);

        // For Schedule Order 

        Route::post('/ScheduleOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'scheduleOrderList']);

        // For Completed Order 

        Route::post('/CompletedOrderList',[App\Http\Controllers\API\Restaurant\OrderManagementController::class, 'completedOrderList']);

// End Restaurant



// For Driver Section 


    // For Driver Registration 
    Route::post('/DriverRegister',[RegisterController::class, 'driverRegister']);

    // For Driver Login 
    Route::post('/Driverlogin',[LoginController::class, 'driverLogin']);

    Route::group(['middleware' => ['auth:api']], function () {

        Route::post('/ProfileDocument',[RegisterController::class, 'ProfileDocument']);

        
    });

// End Driver Section 






