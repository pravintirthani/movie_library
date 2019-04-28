<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
$action=$_REQUEST['action'];
$token=$_REQUEST['token'];

switch ($action) {
    case 'GET_GENRE_LIST':
        return getList($token);        
    default:
        # code...
        break;
}

function getList($token){
    include "connection.php";        
    $query="SELECT * FROM user where login_token='".$token."'";    
    $result=mysqli_query($conn, $query);
    
    if($result!=false &&  mysqli_num_rows($result)>0){  
        $query="SELECT * FROM genres";    
        $data_result=mysqli_query($conn, $query);
        $final_data=[];
        if($data_result!=false &&  mysqli_num_rows($data_result)>0){  
            while($row = mysqli_fetch_assoc($data_result)) {
                array_push($final_data,$row);            
            }
            echo json_encode(["Status"=>"Success","data"=>$final_data]); 
        }else{
            echo json_encode(["Status"=>"Error","message"=>"Error in Fetching Data"]);    
        }          
    }else{
        echo json_encode(["Status"=>"Invalid Token","message"=>"User is Invalid"]);
    }
    mysqli_close($conn);
}

?>