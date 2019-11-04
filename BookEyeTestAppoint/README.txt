MakeAppointment - This indent is used for book an appointment of eye test.

Slot types 

AppointmentTypeValue - Custom or user define slot types

AppointmentType - Custom or user define slots
Prompts - would you like to book eye test appointment?

Date - Built-in or AMAZON.DATE
We only working Monady to Friday i.e. 5 days in a week


get_availabilities(date): Used to define the available date

def build_options(slot, appointment_type, date, booking_map): - Used for confirm the date is weekend or not



Time - Built-in or AMAZON.TIME
We are working only 10am to 6am 
Eye test will take 30mins - To calculate the eye test time we create function that will show the available time slots in a day


def is_available(appointment_time, duration, availabilities): Validating time of appointment



def validate_book_appointment(appointment_type, date, appointment_time): Validating date and time for eye test

 