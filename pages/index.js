import Head from "next/head";
import { MongoClient } from "mongodb";
import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup Project</title>
      </Head>
        <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://zeeldevani90_db_user:A3drJtQ5aNKmtfyl@cluster.kbe8kic.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.find().toArray();

  return {
    props: {
      meetups: meetup.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
