from faker import Faker
import random
from django.http import JsonResponse

fake = Faker()

def get_posts(request):
    posts = []

    for i in range(1, 51):  # Generate 50 dummy posts
        post_id = f"post{str(i).zfill(3)}"
        user_id = f"user{random.randint(1, 10)}"  # Random user IDs from user001 to user010
        school_id = f"school{random.randint(1, 5)}"  # Random school IDs from school001 to school005
        likes = [f"user{random.randint(1, 10)}" for _ in range(random.randint(0, 20))]
        comments = [
            {
                "userID": f"user{random.randint(1, 10)}",
                "content": fake.sentence(nb_words=6)
            }
            for _ in range(random.randint(0, 5))
        ]
        media = {
            "type": random.choice(["image", "video"]),
            "url": fake.image_url() if random.choice(["image", "video"]) == "image" else fake.url()
        }
        post = {
            "postID": post_id,
            "userID": user_id,
            "content": fake.sentence(nb_words=15),
            "media": media,
            "likes": likes,
            "comments": comments,
            "schoolID": school_id
        }
        posts.append(post)

    return JsonResponse(posts, safe=False)
