import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useCheckin } from "../../features/check-in-out/useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { bookings, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const [checkinCheckbox, setcheckinCheckbox] = useState(false);

  useEffect(
    () => setcheckinCheckbox(bookings?.isPaid ?? false),
    [bookings.isPaid]
  );

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookings;

  function handleCheckin() {
    if (!checkinCheckbox) return;
    checkin(bookingId);
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookings} />
      <Box>
        <Checkbox
          checked={checkinCheckbox}
          onChange={() =>
            setcheckinCheckbox((checkinCheckbox) => !checkinCheckbox)
          }
          disabled={checkinCheckbox || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} had paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!checkinCheckbox || isCheckingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
