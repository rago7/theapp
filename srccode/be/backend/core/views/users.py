from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from core.serializers.users import SignupSerializer, LoginSerializer
from faker import Faker
import random
from django.http import JsonResponse

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'message': 'Login successful!'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
fake = Faker()

def get_users(request):
    users = []

    for i in range(10):  # Generate 10 random users
        user = {
            "userID": f"user{str(i).zfill(3)}",  # Unique user ID
            "name": fake.name(),
            "email": fake.email(),
            "gender": random.choice(["male", "female"]),
            "profilePicture": fake.image_url(),  # Placeholder profile picture URL
            "university": f"University {random.randint(1, 5)}",
            "verified": random.choice([True, False]),
        }
        users.append(user)

    return JsonResponse(users, safe=False)  # Return the users as JSON response
