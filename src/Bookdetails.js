import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue, remove, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Bookdetails.css";
import Navbar from "./Navbar";

const ViewDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      const bookingsRef = ref(database, `users/${user.uid}/bookings`);
      const cartRef = ref(database, `users/${user.uid}/cart`);

      
      onValue(bookingsRef, (snapshot) => {
        const bookingsData = snapshot.val() || {};
        setBookings(Object.entries(bookingsData).map(([id, value]) => ({ id, ...value })));
      });

      
      onValue(cartRef, (snapshot) => {
        const cartData = snapshot.val() || {};
        setCart(Object.entries(cartData).map(([id, value]) => ({ id, ...value })));
      });
    } else {
      setBookings([]);
      setCart([]);
    }
  }, [user]);

  const handleDeleteRow = (bookingId, cartId) => {
    if (!user) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const bookingRef = ref(database, `users/${user.uid}/bookings/${bookingId}`);
    const cartRef = ref(database, `users/${user.uid}/cart/${cartId}`);

  
    remove(bookingRef)
      .then(() => remove(cartRef))
      .then(() => {
        alert("Booking and cart item deleted successfully!");
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
      })
      .catch((error) => {
        console.error("Error deleting booking and cart item:", error);
        alert("Error deleting. Please try again.");
      });
  };

  const handleEdit = (entry) => setEditingEntry(entry);

  const handleUpdate = (updatedEntry) => {
    if (!user) {
      alert("User is not authenticated. Please log in.");
      return;
    }
    const updates = {};
    updates[`users/${user.uid}/bookings/${updatedEntry.id}`] = {
      name: updatedEntry.name,
      email: updatedEntry.email,
      date: updatedEntry.date,
      timing: updatedEntry.timing,
      persons: updatedEntry.persons,
    };
    update(ref(database), updates)
      .then(() => setEditingEntry(null))
      .catch((error) => {
        console.error("Error updating booking:", error);
        alert("Error updating booking. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="view-details">
        <h1>Your Bookings</h1>
        {bookings.length === 0 && cart.length === 0 ? (
          <div className="message">
            <p>No details to display! Please book a table or add items to your cart.</p>
          </div>
        ) : (
          <table className="details-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Persons</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <tr>
                    {/* Booking fields */}
                    {editingEntry?.id === booking.id ? (
                      <>
                        <td>
                          <input
                            value={editingEntry.name}
                            onChange={(e) => setEditingEntry({ ...editingEntry, name: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            value={editingEntry.email}
                            onChange={(e) => setEditingEntry({ ...editingEntry, email: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={editingEntry.date}
                            onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            value={editingEntry.timing}
                            onChange={(e) => setEditingEntry({ ...editingEntry, timing: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editingEntry.persons}
                            onChange={(e) => setEditingEntry({ ...editingEntry, persons: e.target.value })}
                          />
                        </td>
                        <td colSpan="3">
                          <button onClick={() => handleUpdate(editingEntry)}>Save</button>
                          <button onClick={() => setEditingEntry(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.date}</td>
                        <td>{booking.timing}</td>
                        <td>{booking.persons}</td>

                        {/* Display cart items under respective columns */}
                        <td>
                          {cart[index] ? (
                            <div>{cart[index].name}</div>
                          ) : (
                            <p>No cart item</p>
                          )}
                        </td>
                        <td>
                          {cart[index] ? (
                            <div>{cart[index].quantity}</div>
                          ) : (
                            <p>No cart item</p>
                          )}
                        </td>
                        <td>
                          {cart[index] ? (
                            <div>{cart[index].totalPrice}</div>
                          ) : (
                            <p>No cart item</p>
                          )}
                        </td>
                        <td>
                          <button onClick={() => handleEdit(booking)}>Edit</button>
                          <button onClick={() => handleDeleteRow(booking.id, cart[index]?.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewDetails;
