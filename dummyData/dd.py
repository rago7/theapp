import json
import random
from faker import Faker
import os

fake = Faker()

# Get user input for the number of users and posts
num_users = int(input("Enter the number of users to generate: "))
num_posts = int(input("Enter the number of posts to generate: "))

# Generate users
users = []
schools = [f"school{str(i).zfill(3)}" for i in range(1, 11)]

for i in range(1, num_users + 1):
    user = {
        "userID": f"user{str(i).zfill(3)}",
        "name": fake.name(),
        "email": fake.email(),
        "gender": random.choice(["male", "female"]),
        "schoolID": random.choice(schools),
        "profilePicture": fake.image_url(),
        "verified": random.choice([True, False])
    }
    users.append(user)

# Generate posts
posts = []
for i in range(1, num_posts + 1):
    post = {
        "postID": f"post{str(i).zfill(3)}",
        "userID": random.choice(users)["userID"],
        "content": fake.sentence(nb_words=12),
        "likes": [random.choice(users)["userID"] for _ in range(random.randint(0, 10))],
        "views": [random.choice(users)["userID"] for _ in range(random.randint(1, 20))],
        "comments": [
            {
                "userID": random.choice(users)["userID"],
                "content": fake.sentence(nb_words=6)
            }
            for _ in range(random.randint(0, 5))
        ],
        "shares": [random.choice(users)["userID"] for _ in range(random.randint(0, 5))],
        "savedBy": [random.choice(users)["userID"] for _ in range(random.randint(0, 5))],
        "visibility": random.choice(["all", "institution_specific"]),
        "schoolID": random.choice(schools)
    }
    posts.append(post)

# Combine into a single dataset
data = {
    "users": users,
    "posts": posts
}

# Save to JSON file in the same folder as the script
current_folder = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_folder, "dummy_data.json")

with open(file_path, "w") as file:
    json.dump(data, file, indent=4)

print(f"Dummy data saved to {file_path}")
