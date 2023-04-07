<?php

require('db.php');


if (isset($_REQUEST['action'])) {
  switch ($_REQUEST['action']) {
    case "getHistory":
      try {
        $db = new DB();
        $res = $db->getWeather($_REQUEST['city_name']);
      } catch (Exception $e) {
        http_response_code(500);
        echo 'Something went wrong';
      }
      break;
    case "postWeather":
      try {
        $db = new DB();
        $res = $db->postWeather($_REQUEST);
      } catch (Exception $e) {
        http_response_code(500);
        echo 'Something went wrong';
      }
      break;
    default:
      break;
  }
}
