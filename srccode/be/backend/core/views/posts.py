from django.http import JsonResponse

def post_list(request):
    return JsonResponse({'message': 'List of posts will go here.'})
