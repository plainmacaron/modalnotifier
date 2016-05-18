<?php

    /**
     * This template may be used to handle ajax requests.
     *
     * Copyright (c) 2016 Plain Macaron
     */
     
    /*
         if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST):
             $post = array_values($_POST);

             $event = $post[0];

             $connection = new mysqli("localhost", "your_username", "your_password", "your_database_name");

             $query = "INSERT INTO `your_event_tracking_table` ";
             $query .= "(";
             $query .= "    `event`";
             $query .= "  , `event_date`";
             $query .= "  , `event_time`";
             $query .= ") ";
             $query .= "VALUES ";
             $query .= "(";
             $query .= "    \"" . $event . "\"";
             $query .= "  , \"" . date("Y-m-d") . "\"";
             $query .= "  , \"" . date("H:i:s") . "\"";
             $query .= ")";

             $result = $connection->query($query);

             if($result):
                 $message = "The event was tracked.";
                 $code = 0;
             else:
                 $message = "An issue was encountered; the event was not tracked.";
                 $code = 1;
             endif;

             $connection->close();

             try
             {
                 $pair = array();
 
                 header("Content-Type: application/json");

                 $pair = array(
                     "status" => $code,
                     "message" => $message
                 );

                 $output = json_encode($pair);
    
                 echo($output);
             }
             catch(Exception $e)
             {
                 die($e->get_message());
             }
         endif;

         exit();
     */

?>