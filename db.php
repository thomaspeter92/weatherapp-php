<?php

class DB
{
  private $username = 'root';
  private $password = '';
  private $dbname = 'weatherapp';

  protected function dbConnect()
  {
    try {
      return new PDO("mysql:host=localhost;dbname=$this->dbname", $this->username, $this->password);
    } catch (PDOException $e) {
      throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
  }

  public function postWeather($params)
  {
    $db = $this->dbConnect();
    $req = $db->prepare('INSERT INTO assessment_2 (city_name, temperature, time_searched, description, icon) VALUES (:city_name, :temperature, :time_searched, :description,:icon)');
    $req->bindValue(':city_name', $params['city_name'], PDO::PARAM_STR);
    $req->bindValue(':temperature', $params['temperature'], PDO::PARAM_INT);
    $req->bindValue(':time_searched', $params['time_searched'], PDO::PARAM_INT);
    $req->bindValue(':description', $params['description'], PDO::PARAM_STR);
    $req->bindValue(':icon', $params['icon'], PDO::PARAM_STR);
    $result = $req->execute();
    echo json_encode($result);
    $req->closeCursor();
  }

  public function getWeather($city)
  {
    $db = $this->dbConnect();
    $req = $db->prepare('SELECT * FROM assessment_2 WHERE city_name = :city_name');
    $req->bindValue(':city_name', $city);
    $req->execute();
    $results = $req->fetchAll(PDO::FETCH_ASSOC);
    $req->closeCursor();
    echo json_encode($results);
  }
}
