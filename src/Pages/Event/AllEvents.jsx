import Container from "../../Components/Container/Container";
import Title from "../../Components/Title/Title";
import EventCard from "./EventCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllEvents = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allEvents } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all_event");
      return res?.data;
    },
  });

  return (
    <div className="min-h-screen">
      <Container>
        <Title title="All Events"></Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {allEvents?.map((event) => (
            <EventCard key={event._id} event={event}></EventCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllEvents;