# puppeteerのAWS Lambda化(Docker)

## 参考にしたもの

- https://qiita.com/sasaco/items/b65ce36c05c50a74ac3e
- https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-create.html
- https://dev.classmethod.jp/articles/aws-cli-v2-blob-default-base64/

## ecrにログイン
```
aws ecr --profile fj-dev get-login-password | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com

docker build -t drslump73/dockertest1 .

docker tag drslump73/dockertest1 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/drslump73/dockertest1:latest
docker tag drslump73/dockertest1 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/drslump73/dockertest1:202212131534
docker push 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/drslump73/dockertest1:latest
docker push 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/drslump73/dockertest1:202212131534
```

## 実際の実行結果を見る
```
aws lambda invoke --profile my-dev --function-name dockertest1 --cli-binary-format raw-in-base64-out --payload '{}' output &> /dev/null ; cat output
```

## container実行
```
docker run -d -p 9000:8080 --name puppeteer_test drslump73/dockertest1
```

## containerに入ってみる
```
docker exec -it puppeteer_test /bin/bash
```

## lambdaで上げる前にlambda上での動作をlocalでテストする(docker内のエミュレーション)
```
curl -d '{}' http://localhost:9000/2015-03-31/functions/function/invocations
```

## パラメータあり
### Funtion URL GET Method
```
curl -d '{"queryStringParameters": {"q": "yahoo"}}' http://localhost:9000/2015-03-31/functions/function/invocations
```

### Funtion URL POST Method
```
curl -d '{"body": {"q": "yahoo"}}' http://localhost:9000/2015-03-31/functions/function/invocations
```
