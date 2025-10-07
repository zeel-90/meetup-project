import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetUpDetailsPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData?.title || 'Loading...'}</title>

      </Head>
      <MeetupDetail
        image={props.meetupData?.image || 'Loading...'}
        title={props.meetupData?.title || 'Loading...'}
        address={props.meetupData?.address || 'Loading...'}
        description={props.meetupData?.description || 'Loading...'}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://zeeldevani90_db_user:A3drJtQ5aNKmtfyl@cluster.kbe8kic.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster"
  );
  const db = client.db();

  const meetupscollection = db.collection("meetups");

  const meetups = await meetupscollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,

    paths: meetups.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupid = context.params.meetupid;

  const client = await MongoClient.connect(
    "mongodb+srv://zeeldevani90_db_user:A3drJtQ5aNKmtfyl@cluster.kbe8kic.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster"
  );
  const db = client.db();

  const meetupscollection = db.collection("meetups");

  const selectedmeetup = await meetupscollection.findOne({
    _id: new ObjectId(meetupid),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedmeetup._id.toString(),
        title: selectedmeetup.title,
        image: selectedmeetup.image,
        address: selectedmeetup.address,
        description: selectedmeetup.description,
      },
    },
  };
}

export default MeetUpDetailsPage;
