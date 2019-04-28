<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if(isset($_REQUEST["action"])){    
    $action=$_REQUEST['action'];    
}
if(isset($_REQUEST["token"])){
    $token=$_REQUEST['token'];    
}
if(isset($_REQUEST["genre_ids"])){
    $genre_ids=$_REQUEST['genre_ids'];    
}
if(isset($_REQUEST["movieid"])){
    $movieid=$_REQUEST['movieid'];    
}

switch ($action) {
    case 'GET_PENDING_MOVIE_LIST_OF_USER':
        return getPendingMovieListOfUser($token,$genre_ids);        
    case 'GET_USER_MOVIE_LIST':
        return getUserMovieList($token);  
    case 'GET_MOVIE_LIST':
        return getMovieList($genre_ids);            
    case 'REMOVE_FAVOURITE_MOVIE':
        return removeFavouriteMovie($token,$movieid);            
    case 'ADD_FAVOURITE_MOVIE':
        return addFavouriteMovie($token,$movieid);                    
    default:
        # code...
        break;
}

function getPendingMovieListOfUser($token,$genre_ids){
    include "connection.php";
    $query="CALL SP_GET_PENDING_MOVIE_LIST_OF_USER('".$token."','".$genre_ids."')";
    $result=mysqli_query($conn, $query);
    if($result!=false && mysqli_num_rows($result)>0){        
        $data=[];
        while($row = mysqli_fetch_assoc($result)) {
            array_push($data,$row);
        }   
        echo json_encode(["Status"=>"Success","data"=>$data]);    
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Fetching Data"]);
    }
    mysqli_close($conn);
}
function getUserMovieList($token){
    include "connection.php";
    $query="CALL SP_GET_USER_MOVIE_LIST('".$token."')";
    $result=mysqli_query($conn, $query);
    
    if($result!=false && mysqli_num_rows($result)>0){        
        $data=[];
        while($row = mysqli_fetch_assoc($result)) {
            array_push($data,$row);
        }   
        echo json_encode(["Status"=>"Success","data"=>$data]);    
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Login"]);
    }
    mysqli_close($conn);
}
function getMovieList($genre_ids){
    include "connection.php";    
      $query=" CALL SP_GET_MOVIE_LIST('".$genre_ids."')";
    $result=mysqli_query($conn, $query);
    
    if($result!=false && mysqli_num_rows($result)>0){        
        $data=[];
        while($row = mysqli_fetch_assoc($result)) {
            array_push($data,$row);
        }   
        echo json_encode(["Status"=>"Success","data"=>$data]);    
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Login"]);
    }
    mysqli_close($conn);
}
function removeFavouriteMovie($token,$movieid){
    include "connection.php";    
      $query=" CALL SP_REMOVE_FAV_MOVIE('".$genre_ids."')";
    $result=mysqli_query($conn, $query);
    
    if($result!=false && mysqli_num_rows($result)>0){                   
        echo json_encode(["Status"=>"Success"]);    
    }
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Login"]);
    }
    mysqli_close($conn);
}
function addFavouriteMovie($token,$movieid){
    include "connection.php";    
      $query=" CALL SP_ADD_FAV_MOVIE('".$genre_ids."')";
     $result=mysqli_query($conn, $query);    
    if($result!=false && mysqli_num_rows($result)>0){                   
        echo json_encode(["Status"=>"Success"]);    
    }else{
        echo json_encode(["Status"=>"Error","message"=>"Error In Login"]);
    }
    mysqli_close($conn);
}
?>