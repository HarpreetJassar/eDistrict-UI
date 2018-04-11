angular.module('agricultureModule', ['authServices', 'configServices', 'notificationServices', 'profileModule'])

.controller('issueseedCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Notification, 
    AgricultureFactory, 
    Config,
    Auth,
    User) {

        $('#datapicker').datepicker({
            format: 'dd/mm/yyyy'
        });

        $('#datapicker2').datepicker({
            format: 'dd/mm/yyyy'
        });

        $(function(){

            $("a[data-toggle='tab']").click(function(){
                $(".wizard-step").attr("class", "btn btn-default wizard-step");
                $($(this).attr("data-tab")).attr("class", "btn btn-primary wizard-step");
            });
    
        });

        if(!$rootScope.service_id) {
            $location.path('/citizen/home');
        }

        $('#selfDeclaration').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_selfDeclaration").append("<strong>Selected File: </strong>" + name);
        });
        $('#residenceProof').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_residenceProof").append("<strong>Selected File: </strong>" + name);
        });
        $('#declaration').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_declaration").append("<strong>Selected File: </strong>" + name);
        });
        $('#formac').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_formac").append("<strong>Selected File: </strong>" + name);
        });
        $('#authSignDoc').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_authSignDoc").append("<strong>Selected File: </strong>" + name);
        });
        $('#map').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_map").append("<strong>Selected File: </strong>" + name);
        });
        $('#cirtFromCompanies').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_cirtFromCompanies").append("<strong>Selected File: </strong>" + name);
        });
        $('#deedMemorandum').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_deedMemorandum").append("<strong>Selected File: </strong>" + name);
        });
        $('#proofOfSales').change(function(e) {
            $in = $(this);
            var tmp = $in.val().split("\\");
            var name = tmp[tmp.length - 1];
            $("#p_proofOfSales").append("<strong>Selected File: </strong>" + name);
        });

        var d = {
            selectfrom: "document_master",
            selectby: "serviceID",
            selectionparam: $rootScope.service_id,
            selectionparam1: ""
        };
        AgricultureFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.docs = t; 
                
            });  
        });
       
        AgricultureFactory.fetch({
            selectfrom: "district_lgd",
            selectby: "",
            selectionparam: "3",
            selectionparam1: ""
        }).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.districts = t; 
            });  
        });

        $scope.$watch('app.firm_district', function() {
            AgricultureFactory.fetch({
                selectfrom: "sub_district_lgd",
                selectby: "",
                selectionparam: $scope.app.firm_district,
                selectionparam1: ""
            }).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.sub_districts = t; 
                });  
            });
            AgricultureFactory.fetch({
                selectfrom: "block_lgd",
                selectby: "",
                selectionparam: $scope.app.firm_district,
                selectionparam1: ""
            }).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.blocks = t; 
                });  
            });
        });

        $scope.$watch('app.firm_sub_district', function () {
            AgricultureFactory.fetch({
                selectfrom: "village_lgd",
                selectby: "subDistrictCode",
                selectionparam: $scope.app.firm_sub_district,
                selectionparam1: ""
            }).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.villages = t; 
                });  
            });
        });    

    $scope.app = {};
    $scope.app.Applyingforself = "Y";
    $scope.app.Relationwithbeneficiary = "SELF";
    $scope.app.Applicationtype = "Issuance";
    $scope.app.Licenseeaadharnumberrefkey = "";
    $scope.app.Serviceid = $rootScope.service_id;
    $scope.app.Firmnamepunjabi = "";
    $scope.app.Seeddetails = [];
    $scope.app.Regiontype = "Urban";
    $scope.app.Districtid = $scope.app.firm_district;
    $scope.app.Tehsilid = $scope.app.firm_sub_district;
    $scope.app.Blockid = $scope.app.firm_block;
    if($scope.app.firm_region == 'Urban') $scope.app.firm_village = "";
    $scope.app.Villageid = $scope.app.firm_village;
    $scope.app.Wardno = "1";
    $scope.app.Pincode = "1";
    $scope.app.Storagedetails = [];
    $scope.app.Licenseno = "";
    $scope.app.Operationtype = "";
    $scope.app.DistrictIDlicense = "";
    $scope.app.Nameoffirm = "";



    User.getUserProfile().then(function(data) {
        $scope.prof = data.data[0];
        $scope.name = $scope.prof.first_name + " " + $scope.prof.middle_name + " " + $scope.prof.last_name;
    });

    User.fetchUserAddress({ address_type: "C" }).then(function (data) {
        $scope.app.Applicantaddress = data.data[0].address_line_1;
    });

    $scope.addTB1 = function() {
        if(!$scope.producer || !$scope.supplier || !$scope.commodity || !$scope.added_on || !$scope.valid_till) {
            Notification.error("Oops!", "Fill all the required fields");
            return;
        }
        ($scope.app.Seeddetails).push({
            producer_name: $scope.producer,
            supplier_name: $scope.supplier,
            commodity_name: $scope.commodity,
            added_on: $scope.added_on,
            valid_upto: $scope.valid_till,
            producer_name_punjabi: "",
            supplier_name_punjabi: "",
            commodity_name_punjabi: ""
        });

        /*$scope.producer = "";
        $scope.supplier = "";
        $scope.commodity = "";
        $scope.added_on = "";
        $scope.valid_till = "";*/
        
    };

    $scope.addTB2 = function() {dfdff;
        if(!$scope.storage) {
            Notification.error("Oops!", "Fill all the required fields");
            return;
        }
        ($scope.app.Storagedetails).push({
            address_of_store: $scope.storage,
            address_of_store_punjabi: ""
        });
        //$scope.storage = "";
    };

    $scope.add = function() {
        $scope.addTB1();
        $scope.addTB2();
        if(($scope.app.Seeddetails).length == 0 || ($scope.app.Storagedetails).length == 0) {
            Notification.error("Oops!", "Add Seed Details and/or Storage Details.");
            return;
        }
        if($scope.app.Isconvictedunder1955 == 'N') $scope.app.Convictiondetails = "";
        AgricultureFactory.add({obj: $scope.app}).then(function(data) {
            console.log(data.data);
            if(data.data[0].response == 1) {
                $rootScope.appID = data.data[0].application_number; 
            } else {
                if(data.data[0].sys_message){
                    Notification.error('Oops!', data.data[0].sys_message);
                }
                else{
                    Notification.error('Oops!', data.data[0].reason);
                }
                
            }
        })
    };

    $scope.upload = function() {
        $scope.d = {};
        $scope.file.selfDeclaration.doc_ref_id = "1";
        $scope.file.residenceProof.doc_ref_id = "2";
        $scope.file.declaration.doc_ref_id = "3";
        $scope.file.formac.doc_ref_id = "4";
        $scope.file.authSignDoc.doc_ref_id = "5";
        $scope.file.map.doc_ref_id = "6";
        $scope.d.applicationID = ($rootScope.appID).substring(6);
        
        $scope.d.docs = [
            $scope.file.selfDeclaration,
            $scope.file.residenceProof,
            $scope.file.declaration,
            $scope.file.formac,
            $scope.file.authSignDoc,
            $scope.file.map
        ];
        if(($scope.d.docs).length < 6) {
            Notification.error("Oops!", "Please upload all mendatory documents!");
            return;
        }
        if($scope.file.cirtFromCompanies) {
            $scope.file.cirtFromCompanies.doc_ref_id = "7";
            ($scope.d.docs).push($scope.file.cirtFromCompanies);
        }
        if($scope.file.deedMemorandum) {
            $scope.file.deedMemorandum.doc_ref_id = "8";
            ($scope.d.docs).push($scope.file.deedMemorandum);
        }
        if($scope.file.proofOfSales) {
            $scope.file.proofOfSales.doc_ref_id = "9";
            ($scope.d.docs).push($scope.file.proofOfSales);
        }

        AgricultureFactory.uploadDocs({obj: $scope.d}).then(function(data) {
            if(data.data[0].response == 1) {
                Notification.success('Documents Uploaded!', "Your documents has been uploaded.");
                $rootScope.govt_fees = data.data[0].govt_fee;
            } else {
                if(data.data[0].sys_message){
                    Notification.error('Oops!', data.data[0].sys_message);
                }
                else{
                    Notification.error('Oops!', data.data[0].reason);
                }
                
            }
        });
    };

    $scope.spay = function() {
        $scope.pay = {
            applicationID: ($rootScope.appID).substring(6),
            txn_type: "credit",
            charge_type: "govt_fees",
            payment_mode: "NB",
            facilitation_charge: 0.00,
            govt_charges: $rootScope.govt_fees,
            txn_status: "S",
            pg_reference_id: ""
        };
        AgricultureFactory.s_pay({obj: $scope.pay}).then(function(data) {
            console.log(data.data);
            if(data.data[0].response == 1) {
                Notification.success('Fees Collected!', "Your payment fees has been calculated.");
                $rootScope.reciept_data = data.data[0];
                $location.path('/citizen/reciept');
            } else {
                if(data.data[0].sys_message){
                    Notification.error('Oops!', data.data[0].sys_message);
                }
                else{
                    Notification.error('Oops!', data.data[0].reason);
                }
                
            }
        });
    };

})

.controller('issueseedCtrlReview', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Notification, 
    AgricultureFactory, 
    Config,
    Auth) {
        $scope.d_u = Config.download_url;
        if(!$rootScope.appID_review || !$rootScope.status_review || !$rootScope.stage_review) {
            $location.path('/citizen/history');
        } else {
            $scope.check = false
            AgricultureFactory.fetchApp({ appid: $rootScope.appID_review }).then(function (data) {
                    console.log(data.data[3]);
                    $scope.personal_details = data.data[0][0];
                    $scope.personal_details.name = $scope.personal_details.first_name + " " + $scope.personal_details.middle_name + " " + $scope.personal_details.last_name;
                    $scope.address_details = data.data[1][0];
                    $scope.application_details = data.data[2][0];
                    $scope.seeds = data.data[3];
                    $scope.storages = data.data[4];
                    $scope.images = data.data[6];
            });
        }
    })
    .controller('fertilizerLicenceCtrl', function($location,
        $scope,
        $window,
        $timeout,
        $rootScope,
        Notification, 
        AgricultureFactory, 
        Config,
        Auth,
        User) {
            $('#datapicker').datepicker({
                format: 'dd/mm/yyyy'
            });
    
            $('#datapicker2').datepicker({
                format: 'dd/mm/yyyy'
            });
            $(function(){

                $("a[data-toggle='tab']").click(function(){
                    $(".wizard-step").attr("class", "btn btn-default wizard-step");
                    $($(this).attr("data-tab")).attr("class", "btn btn-primary wizard-step");
                });
        
            });
    
            $scope.app = {};
            
            User.getUserProfile().then(function(data) {
                $scope.prof = data.data[0];
                $scope.name = $scope.prof.first_name + " " + $scope.prof.middle_name + " " + $scope.prof.last_name;
            });
        
            User.fetchUserAddress({ address_type: "C" }).then(function (data) {
                $scope.app.Applicantaddress = data.data[0].address_line_1;
            });
            var d = {
                selectfrom: "document_master",
                selectby: "serviceID",
                selectionparam: $rootScope.service_id,
                selectionparam1: ""
            };
            AgricultureFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.docs = t; 
                    console.log(t);
                });  
            });
            
            
        })
    .controller('fertilizerLicenceReviewCtrl', function($location,
            $scope,
            $window,
            $timeout,
            $rootScope,
            Notification, 
            AgricultureFactory, 
            Config,
            Auth) {
                
            })
.factory('AgricultureFactory', function($http, Config) {

    var Agri_Factory = {};

    Agri_Factory.add = function(data) {
        //return $http.post(Config.base_url + 'ModuleCitizen/serAgriculture.asmx/serfnInsertSeedLicApplication', data);
    };

    Agri_Factory.uploadDocs = function(data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serAgriculture.asmx/serfnUploadDoc', data);
    };

    Agri_Factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data);
    };

    Agri_Factory.fetchApp = function(data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serAgriculture.asmx/serfnFetchApplicationsDetails', data);
    };

    Agri_Factory.s_pay = function(data) {
        return $http.post(Config.base_url + 'ModuleApp/serPayment.asmx/serfnSavePaymentCitizen', data);
    };

    return Agri_Factory;
});