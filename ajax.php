<?php

// AJAX for API request call
// completed with curl

include("inc/init.php");

$internal = isset($_POST['internal']) ? "&internal=1" : "";
$yelp = isset($_POST['yelp']) ? "&yelp=1" : "";
$google = isset($_POST['google']) ? "&google=1" : "";

$offset = isset($_POST['page']) ? intval($_POST['page']) * $glPageVol : 0;
$threshold = isset($_POST['threshold']) ? "&threshold=" . intval($_POST['threshold']) : "";

$apiKey = "61067f81f8cf7e4a1f673cd230216112";
$serviceURL = "http://test.localfeedbackloop.com/api?apiKey=" . $apiKey . "&noOfReviews=". $glPageVol . $internal . $yelp . $google . "&offset=" . $offset . $threshold;

$curl = curl_init($serviceURL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
if ($response === false) {
    $info = curl_getinfo($curl);
    curl_close($curl);
    header('Content-Type: application/json');
    echo array('result' => 'error', 'info' => $info);
}
curl_close($curl);
$response = json_decode($response);
$response->result = "success";
$response->url = $serviceURL;
$response = json_encode($response);

header('Content-Type: application/json');
echo $response;

?>