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
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [checkinCheckbox, setcheckinCheckbox] = useState(false);
  const [optionalBreakfast, setoptionalBreakfast] = useState(false);
  const { bookings, isLoading } = useBooking();
  useEffect(() => setcheckinCheckbox(bookings?.isPaid ?? false), [bookings]);
  const { settings, isLoading: isLoadingSetting } = useSetting();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  if (isLoading || isLoadingSetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookings;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  console.log("optionalBreakfastPrice = " + optionalBreakfastPrice);
  function handleCheckin() {
    if (!checkinCheckbox) return;

    if (optionalBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }
  const { breakfastPrice } = settings;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookings} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setoptionalBreakfast((optionalBreakfast) => !optionalBreakfast);
              setcheckinCheckbox(false);
            }}
          >
            Confirm Adding Optional Breakfast of{" "}
            {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={checkinCheckbox}
          onChange={() =>
            setcheckinCheckbox((checkinCheckbox) => !checkinCheckbox)
          }
          disabled={optionalBreakfast ? false : checkinCheckbox || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} had paid the total amount of{" "}
          {!optionalBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(optionalBreakfastPrice + totalPrice)}
          (${formatCurrency(totalPrice)} + ${formatCurrency(breakfastPrice)})`}
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
