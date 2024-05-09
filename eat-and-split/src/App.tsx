import { useId, useState } from "react"

interface Friend {
  id: string
  name: string
  image: string
  balance: number
}

const initialFriends: Array<Friend> = [
  {
    id: crypto.randomUUID(),
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: crypto.randomUUID(),
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]

export default function App() {
  const [friends, setFriends] = useState<Array<Friend>>(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false)

  function handleAddFriend(friend: Friend) {
    setFriends((fs) => [...fs, friend])
    setShowAddFriend(false)
  }

  function handleSelectFriend(friend: Friend) {
    if (selectedFriend?.id == friend.id) {
      setSelectedFriend(null)
    } else {
      setSelectedFriend(friend)
    }
    setShowAddFriend(false)
  }

  function handleSplitBill(value: number) {
    setFriends((fs) =>
      fs.map((f) => {
        if (f.id == selectedFriend?.id) {
          return {
            ...f,
            balance: f.balance + value,
          }
        } else {
          return f
        }
      })
    )
    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend ? (
          <>
            <FormAddFriend onAddFriend={handleAddFriend} />
            <Button onClick={() => setShowAddFriend(false)}>Close</Button>
          </>
        ) : (
          <Button onClick={() => setShowAddFriend(true)}>Add friend</Button>
        )}
      </aside>

      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

function FriendList({
  friends,
  selectedFriend,
  onSelectFriend,
}: {
  friends: Array<Friend>
  selectedFriend: Friend | null
  onSelectFriend: (friend: Friend) => void
}) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          key={f.id}
          friend={f}
          onSelectFriend={onSelectFriend}
          isSelected={f.id == selectedFriend?.id}
        />
      ))}
    </ul>
  )
}

function Friend({
  friend,
  isSelected,
  onSelectFriend: handleSelectFriend,
}: {
  friend: Friend
  isSelected: boolean
  onSelectFriend: (friend: Friend) => void
}) {
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} width={48} height={48} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${friend.balance * -1}
        </p>
      )}
      {friend.balance == 0 && <p>You and your friend are even</p>}
      {friend.balance > 0 && (
        <p className="green">Your friend owes you ${friend.balance}</p>
      )}
      <Button onClick={() => handleSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  )
}

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  )
}

function FormAddFriend({
  onAddFriend: handleAddFriend,
}: {
  onAddFriend: (friend: Friend) => void
}) {
  const DEFAULT_IMAGE = "https://i.pravatar.cc/48"
  const [name, setName] = useState<string>("")
  const [image, setImage] = useState<string>(DEFAULT_IMAGE)
  const id = useId()
  const nameId = `name-${id}`
  const imageId = `image-${id}`

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name || !image) return

    const id = crypto.randomUUID()
    handleAddFriend({
      id,
      name,
      image: image + "?u=" + id,
      balance: 0,
    })
    setName("")
    setImage(DEFAULT_IMAGE)
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label htmlFor={nameId}>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        name="name"
        id={nameId}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor={imageId}>📷 Image URL</label>
      <input
        type="text"
        name="image"
        id={imageId}
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({
  selectedFriend,
  onSplitBill: handleSplitBill,
}: {
  selectedFriend: Friend
  onSplitBill: (value: number) => void
}) {
  const [bill, setBill] = useState<number | "">("")
  const [yourExpense, setYourExpense] = useState<number | "">("")
  const [payer, setPayer] = useState<"user" | "friend">("user")
  const id = useId()
  const billValueId = `bill-value-${id}`
  const yourExpenseId = `your-expense-${id}`
  const friendExpenseId = `friend-expense-${id}`
  const payerId = `payer-${id}`
  const paidByFriend = bill != "" && yourExpense != "" ? bill - yourExpense : ""

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!bill || !yourExpense || !paidByFriend) return

    const splitValue = payer == "user" ? paidByFriend : -paidByFriend
    handleSplitBill(splitValue)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label htmlFor={billValueId}>💸 Bill value</label>
      <input
        type="number"
        name="billValue"
        min={0}
        id={billValueId}
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor={yourExpenseId}>💰 Your expense</label>
      <input
        type="number"
        name="yourExpense"
        min={0}
        id={yourExpenseId}
        value={yourExpense}
        onChange={(e) => {
          const value = Number(e.target.value)
          if (!bill || value > bill) return
          setYourExpense(value)
        }}
      />

      <label htmlFor={friendExpenseId}>
        💴 {selectedFriend.name}'s expense
      </label>
      <input
        type="number"
        name="friendExpense"
        id={friendExpenseId}
        value={paidByFriend}
        disabled
      />

      <label htmlFor={payerId}>🤭 Who will pay the bill?</label>
      <select
        name="payer"
        id={payerId}
        value={payer}
        onChange={(e) => setPayer(e.target.value as "user" | "friend")}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}
