from rest_framework import serializers
from core.models.users import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'fname', 'lname', 'dob', 'gender', 'profile_pic_url', 'university']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            fname=validated_data['fname'],
            lname=validated_data['lname'],
            dob=validated_data.get('dob'),
            gender=validated_data.get('gender'),
            profile_pic_url=validated_data.get('profile_pic_url'),
            university=validated_data.get('university'),
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
