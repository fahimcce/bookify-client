/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Loading from "../../components/common/Loading";
import { Input, Form, Select, SelectProps, Button, Pagination } from "antd";
import { FaBars } from "react-icons/fa";
import RoomCard from "../../components/RoomCard";
import { useDebounce } from "../../useHooks/useDebounce";
import { useGetAllRoomsQuery } from "../../redux/api/roomManagement/room.api";
import NoDataFound from "../../components/common/NoDataFound";

const MeetingRooms = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(undefined);
  const [capacity, setCapacity] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  // const [searchParams, setSearchParams] = useState<[] | undefined>(undefined)
  const srcDebounce = useDebounce(search, 1000);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = useGetAllRoomsQuery({
    search: srcDebounce,
    range,
    capacity,
    sort,
    page: `${pages}`,
  });
  const rooms = data?.data?.result;
  const meta = data?.data?.meta;
  // console.log(meta);
  if (isLoading) {
    return <Loading />;
  }
  const capaCityOptions: SelectProps["options"] = [
    {
      value: `0-4`,
      label: `0-4`,
    },
    {
      value: `4-8`,
      label: `4-8`,
    },
    {
      value: `8-12`,
      label: `8-12`,
    },
    {
      value: `12-16`,
      label: `12-16`,
    },
    {
      value: `16-20`,
      label: `16-20`,
    },
    {
      value: `20+`,
      label: `20+`,
    },
  ];

  let maxValue = 0;
  rooms?.forEach((item: any) => {
    if (maxValue < item?.pricePerSlot) {
      maxValue = item.pricePerSlot;
    }
  });
  const priceFilter: SelectProps["options"] = [
    {
      value: `0-5000`,
      label: `0-5000`,
    },
    {
      value: `5000-10000`,
      label: `5000-10000`,
    },
    {
      value: `10000-20000`,
      label: `10000-20000`,
    },
    {
      value: `20000-30000`,
      label: `20000-30000`,
    },
    {
      value: `30000+`,
      label: `30000+`,
    },
  ];

  // handle reset
  const handleReset = () => {
    setSearch("");
    setRange(undefined);
    setCapacity(undefined);
    setSort(undefined);
    setPages(1);
  };

  return (
    <>
      {
        <section className="px-4 sm:px-10 md:px-20">
          <div
            className={`text-end mt-2 fixed z-50 bg-transparent backdrop:blur-sm top-12 ${
              sideOpen ? "left-0" : ""
            }`}
          >
            <Button className="" onClick={() => setSideOpen(!sideOpen)}>
              <FaBars />
            </Button>
          </div>
          <div className="gap-8 relative min-h-screen ">
            <div
              className={`bg-white md:w-[20%] absolute h-full duration-300 z-30 ${
                sideOpen ? "-left-full" : null
              } border p-3`}
            >
              <div className="py-1 grid grid-cols-1 md:gap-4 mt-10">
                <Form.Item
                  label="Search"
                  layout="vertical"
                  className="font-bold"
                >
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Room Name & amenities"
                  />
                </Form.Item>
                <Form.Item
                  label="Capacity"
                  layout="vertical"
                  className="font-bold"
                >
                  <Select
                    options={capaCityOptions}
                    value={capacity}
                    placeholder="Filter by capacity"
                    onChange={(value) => {
                      setCapacity(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Price Range"
                  layout="vertical"
                  className="font-bold"
                >
                  <Select
                    value={range}
                    onChange={(value) => setRange(value)}
                    options={priceFilter}
                    placeholder="Filter by Price Range"
                  />
                </Form.Item>
                <Form.Item
                  label="Sort by Price"
                  layout="vertical"
                  className="font-bold"
                >
                  <Select
                    value={sort}
                    onChange={(value) => setSort(value)}
                    options={[
                      { value: "pricePerSlot", label: "Low To High" },
                      { value: "-pricePerSlot", label: "High to Low" },
                    ]}
                    placeholder="Sort by price"
                  />
                </Form.Item>
                <Form.Item
                  label="Reset"
                  layout="vertical"
                  className="font-bold"
                >
                  <Button onClick={handleReset}>Reset All</Button>
                </Form.Item>
              </div>
            </div>
            {rooms?.length ? (
              <div
                className={`absolute overflow-y-scroll h-full right-0 top-0 w-full border duration-300 p-4 bg-slate-50 ${
                  sideOpen ? "w-[100%]" : "md:w-[80%]"
                }`}
              >
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7 ${
                    sideOpen ? "xl:grid-cols-4" : "xl:grid-cols-3"
                  }`}
                >
                  {rooms?.map((item: any, idx: number) => (
                    <div key={idx}>
                      <RoomCard
                        pageName="meetingRoom"
                        _id={item._id}
                        name={item.name}
                        amenities={item.amenities}
                        capacity={item.capacity}
                        floorNo={item.floorNo}
                        pricePerSlot={item.pricePerSlot}
                        roomImg={item.roomImg}
                        roomNo={item.roomNo}
                      />
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Pagination
                    size="small"
                    pageSize={pages}
                    total={meta?.totalPage}
                    showSizeChanger
                    onChange={(page) => setPages(page)}
                  />
                </div>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </section>
      }
    </>
  );
};

export default MeetingRooms;
