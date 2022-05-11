package database

import (
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

type CallMsgLogs struct {
	gorm.Model
	From         string
	To           string
	RecordingUrl string
	Message      string
}

func addDatabase(dbname string) error {
	// create database with dbname, won't do anything if db already exists
	DB.Exec("CREATE DATABASE " + dbname)

	// connect to newly created DB (now has dbname param)
	dsn := "dbname=" + dbname + " host=db user=docker password=docker sslmode=disable"
	_, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	return nil
}

func Init() (*gorm.DB, error) {

	log.Println("Connecting to DB...")
	// set up DB connection and then attempt to connect 5 times over 25 seconds
	dsn := "host=db user=docker password=docker sslmode=disable"
	for i := 0; i < 5; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		return DB, err
	}

	// create table if it does not exist
	if !DB.Migrator().HasTable(&CallMsgLogs{}) {
		DB.Migrator().CreateTable(&CallMsgLogs{})
	}

	//testPost := CallMsgLogs{From: "18918691234", To: "18918694321", RecordingUrl: "https://www.bing.com"}
	//DB.Create(&testPost)

	return DB, err
}
