<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
$action="";
$name="";
$email="";
$password="";

if(isset($_REQUEST["action"])){    
    $action=$_REQUEST['action'];    
}
if(isset($_REQUEST["name"])){
    $name=$_REQUEST['name'];    
}
if(isset($_REQUEST["email"])){
    $email=$_REQUEST['email'];    
}
if(isset($_REQUEST["password"])){
    $password=$_REQUEST['password'];    
}


switch ($action) {
    case 'LOGIN':
        return login($email,$password);        
    case 'SIGN_UP':
        return signUp($name,$email,$password);        
    default:
       return json_encode(["Status"=>"Error","message"=>"Error In Login"]);        
}

function login($email,$password){
    include "connection.php";        
    $query="SELECT login_token FROM user where email='".$email."' AND password='".$password."'";    
    $result=mysqli_query($conn, $query);
    
    if($result!=false &&  mysqli_num_rows($result)>0){        
        while($row = mysqli_fetch_assoc($result)) {
            echo json_encode(["Status"=>"Success","data"=>["token"=>$row["login_token"]]]);
        }       
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Login"]);
    }
    mysqli_close($conn);
}
function signUp($name,$email,$password){
    include "connection.php";        
    $query="insert into user (`name`,`email`,`password`) values('".$name."','".$email."','".$password."')";    
    $result=mysqli_query($conn, $query);        
    if($result){                
        echo json_encode(["Status"=>"Success","message"=>"User Succesfully Registered"]);        
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Registering User"]);
    }
    mysqli_close($conn);
}
?>