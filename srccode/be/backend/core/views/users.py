from django.http import JsonResponse

def user_list(request):
    return JsonResponse({'message': 'List of users will go here.'})
