import { useState } from "react";
import { Row, Col, Card, Input, Select, Button, Pagination } from "antd";

import "./MeetingRooms.css"; // Import any custom CSS if needed
import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";

const { Search } = Input;
const { Option } = Select;

const MeetingRooms = () => {
  const [search, setSearch] = useState("");
  const [capacity, setCapacity] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Adjust based on screen size and layout

  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  const rooms = data?.data?.result || [];

  const filteredRooms = rooms
    .filter((room) => room.name.toLowerCase().includes(search.toLowerCase()))
    .filter((room) => (capacity ? room.capacity === Number(capacity) : true))
    .sort((a, b) => {
      if (priceSort === "asc") return a.pricePerSlot - b.pricePerSlot;
      if (priceSort === "desc") return b.pricePerSlot - a.pricePerSlot;
      return 0;
    });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCapacity("");
    setPriceSort("");
    setCurrentPage(1);
  };

  return (
    <div className="meeting-rooms-container">
      <div className="filters-section">
        <Search
          placeholder="Search by room name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by capacity"
          value={capacity}
          onChange={(value) => setCapacity(value)}
          style={{ width: 150, marginLeft: 16 }}
        >
          <Option value="">All Capacities</Option>
          <Option value="4">4</Option>
          <Option value="6">6</Option>
          <Option value="8">8</Option>
        </Select>
        <Select
          placeholder="Sort by price"
          value={priceSort}
          onChange={(value) => setPriceSort(value)}
          style={{ width: 150, marginLeft: 16 }}
        >
          <Option value="">No Sort</Option>
          <Option value="asc">Price: Low to High</Option>
          <Option value="desc">Price: High to Low</Option>
        </Select>
        <Button onClick={handleClearFilters} style={{ marginLeft: 16 }}>
          Clear Filters
        </Button>
      </div>

      {/* Room Cards */}
      <Row gutter={[16, 16]} justify="center">
        {isLoading ? (
          <p>Loading...</p>
        ) : paginatedRooms.length > 0 ? (
          paginatedRooms.map((room) => (
            <Col xs={24} sm={12} md={8} lg={8} key={room._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={room.name}
                    src={room.images[0] || "/default-room.jpg"}
                  />
                }
                className="room-card"
              >
                <Card.Meta
                  title={room.name}
                  description={
                    <>
                      <p>Capacity: {room.capacity}</p>
                      <p>Price per Slot: ৳{room.pricePerSlot}</p>
                      <Button type="primary">See Details</Button>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </Row>

      {/* Pagination */}
      {filteredRooms.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredRooms.length}
          onChange={handlePageChange}
          className="pagination"
          style={{ textAlign: "center", marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default MeetingRooms;
