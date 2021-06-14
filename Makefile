deploy-v2:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--exclude .env \
				--exclude dist \
				--exclude node_modules \
				--exclude workers \
				--filter=":- .gitignore" \
				. sotatek@192.168.1.206:/var/www/sotatek_starter/frontend-user
	# ssh sotatek@172.16.1.212 "cd /var/www/sotatek_starter/frontend-user && npm i"

	# ssh sotatek@172.16.1.212 "rm -rf node_modules/ package-lock.json"
	# ssh sotatek@172.16.1.212 "npm i && make all"
	# ssh sotatek@172.16.1.212 "pm2 restart app.json"

#deploy-production:
#	rsync -avhzL --delete \
#				--no-perms --no-owner --no-group \
#				--exclude .git \
#				--exclude .env \
#				--exclude dist \
#				--exclude node_modules \
#				--filter=":- .gitignore" \
#				. ubuntu@ec2-3-1-7-62.ap-southeast-1.compute.amazonaws.com:/home/ubuntu/loyalty-platform/backend/workers
